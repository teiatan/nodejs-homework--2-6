const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://teiatan:studyallthetime@cluster0.mrmsfwp.mongodb.net/phonebook?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(()=>console.log('coonected to database'))
  .catch(error => error.message)


const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found. Page doesn't exist" })
});

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({
    message
  })
});

module.exports = app;
