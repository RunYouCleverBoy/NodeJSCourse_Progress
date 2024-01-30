const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

module.exports = app;
