const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/contacts', contactsRouter);
app.use('/users', usersRouter);

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

const sgMail = require("@sendgrid/mail");
const {SENDGRID_API_KEY} = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const email = {
  to: "protas.tb@gmail.com",
  from: "protas.tb@gmail.com",
  subject: "Test email",
  html: "<h1>Hello world</h1>"
};

sgMail.send(email)
  .then(()=>console.log("successfully ssend"))
  .catch(error => console.log(error.message))
  