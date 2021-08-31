const express = require('express');
const helmet = require('helmet');
var createError = require('http-errors');




const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var apiRouter = require('./routes/api');
var plRouter = require('./routes/pl');
var sdRouter = require('./routes/sd');
var socketio = require('./socket.io/index');
var path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');



const app = express();
//跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.type('html');//

    next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/post', postRouter);
app.use('/pl', plRouter);
app.use('/sd', sdRouter);
app.use('/socket', socketio);
// default catch all handler




app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('接口未定义')));

module.exports = app;
