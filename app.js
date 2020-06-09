// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res)=>{
  const display = { message : "Hello World!" }
  res.status(200).json(display)
})

module.exports = app;
