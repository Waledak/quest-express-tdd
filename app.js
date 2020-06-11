// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res)=>{
  const display = { message : "Hello World!" }
  res.status(200).json(display)
});

app.get('/bookmarks/:id', (req,res)=>{
  const query = `SELECT * FROM bookmark WHERE id = ?`
  connection.query(query, req.params.id, (err, results) => {
    if(err){
      res.sendStatus(500);
    }else{
      if(results.length > 0){
        res.status(200).json(results[0])
      }else{
        res.status(404).json({ error: 'Bookmark not found' })
      }
      
    }
  })
});

app.post('/bookmarks', (req, res)=>{
  if(req.body.url && req.body.title){
    let query = `INSERT INTO bookmark (url, title) VALUES (?,?)`
    connection.query(query, [req.body.url, req.body.title], (err, results) => {
      if(err){
        res.status(500).send(err)
      }
      callback(results)
    })
    const callback = (results) => {
      query = `SELECT * from bookmark where id = ${results.insertId}`
      connection.query(query, (err, results) => {
        if(err){
          res.status(404).send("Not Found")
        }
        res.status(201).json(results[0])
      })
    }
    
    //connection.query(`SELECT `)
    //.json({ url: 'https://jestjs.io', title: 'Jest' })
  }else{
    res.status(422).json({"error": "required field(s) missing"})
  }
})
module.exports = app;
