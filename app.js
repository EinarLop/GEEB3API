var express = require('express');
require('dotenv').config()  // to load the values specified in .env

var app = express();

var port = process.env.PORT || 3000;

// Require Router modules
var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');
var usersRouter = require('./routes/users');

// Mongoose Setup

const mongoose = require('mongoose');
const uri = process.env.CONNECTIONSTRING;
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'MongoDB Connection Error'));
console.log("Connection to mongoDB succesful");

// Middleware libraries for request handling
app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use(express.json())

app.listen(port, ()=> console.log('Express server up and running: ' + port));