var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRoutes = require('./routes/usersRoutes');
var rotasRoutes = require('./routes/rotasRoutes');
var locaisRoutes = require('./routes/locaisRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRoutes);
app.use('/api/rotas', rotasRoutes);
app.use('/api/locais', locaisRoutes);

module.exports = app;

