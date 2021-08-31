const express = require('express');
const helmet = require('helmet');
const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes/index');
var path = require('path');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());
app.use('/', routes);

// default catch all handler
app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

module.exports = app;
