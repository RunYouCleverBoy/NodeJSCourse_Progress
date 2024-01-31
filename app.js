const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);


app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

module.exports = app;
