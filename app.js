var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

// Require Router modules
var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');
var usersRouter = require('./routes/users');

// Mongoose Setup

var mongoose = require('mongoose');
var uri = 'mongodb+srv://geeb:geeb123@cluster0.dxgwa.mongodb.net/development01?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'MongoDB Connection Error'));


// Middleware libraries for request handling
app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use(express.json())

app.listen(port, ()=> console.log('Express server up and running: ' + port));