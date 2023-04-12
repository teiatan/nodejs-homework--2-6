// const app = require('./app');
const express = require('express');
const app = express();


app.get("/", (req, res) => {
  res.send('<h2>helloo<h2>');
});

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
});
