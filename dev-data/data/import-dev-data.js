const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.MONGO_PASSWORD
);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log('DB connection successful!'));

const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');
// Import data into DB
const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

(async () => {
    if (process.argv[2] === '--import') await importData();
    if (process.argv[2] === '--delete') await deleteData();
    process.exit();
})();
