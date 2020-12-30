var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

// Require Router modules
var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');

// Mongoose Setup
/*
var mongoose = require('mongoose');
var uri = '';
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'MongoDB Connection Error'));*/


// Middleware libraries for request handling
app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use(express.json())

app.listen(port, ()=> console.log('Express server up and running: ' + port));