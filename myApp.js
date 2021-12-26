var express = require('express');
var bodyParser = require('body-parser');

var app = express();
require('dotenv').config;

console.clear();

// FCC #5-2.1
//console.log("Hello World");

/*** MiddleWare always to the beginning of all routes! ***/
// FCC #5-2.7
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// FCC #5-2.11
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// FCC #5-2.3/4
app.get('/', (req, res) => {
  // FCC #5-2.2 -> res.send('Hello Express');
  res.sendFile(__dirname + '/views/index.html');
  app.use('/public', express.static(__dirname + '/public'));
});

// FCC #5-2.5/6
// Replit: dotenv does not manually work until 'MESSAGE_STYLE' defined in the 'Secrets'-Menu on the left!
app.get("/json", (req, res) => {
  let msg = 'Hello json';
  res.json({ message: process.env['MESSAGE_STYLE']==='uppercase' 
              ? msg.toUpperCase() 
              : msg }
          );
});


// FCC #5-2.8
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});

// FCC #5-2.9
app.get('/:word/echo', (req, res) => {
  res.send({echo: req.params.word});
});

// FCC #5-2.10
app.get('/name', (req, res) => {
  console.log(req.query.first);
  res.json({name: req.query.first + ' ' + req.query.last});
});


// FCC #5-2.12
app.post('/name', (req, res) => {
  res.json({name: `${req.body.first} ${req.body.last}` })
});


module.exports = app;