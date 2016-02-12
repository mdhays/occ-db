'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const _ = require('lodash');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URL = 'mongodb://localhost:27017/node-webserver';
let db;





const PORT = process.env.PORT || 3000;
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {

  res.render('welcome', {
      title: 'occ-db',
      date: new Date()
  });
});





MongoClient.connect(MONGODB_URL, (err, database) => {
  if (err) throw err;

  db = database;

  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});

app.all('*', (req, res) => {
  res.status(403);
  res.send('<h1>access denied</h1>');
});

