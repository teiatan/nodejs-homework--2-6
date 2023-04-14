const app = require('./app');
const {DB_HOST} = process.env;

const mongoose = require("mongoose");


// mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(()=>app.listen(3000))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });