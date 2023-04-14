const app = require('./app')

const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://teiatan:studyallthetime@cluster0.mrmsfwp.mongodb.net/phonebook?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(()=>app.listen(3000))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });