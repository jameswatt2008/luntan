const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const demo = require('./demo.route');

const r = Router();

r.use('/demo', demo);

r.get('/', (req, res) => res.json(new SuccessResponseObject('接口测试')));

/* GET home page. */
r.get('/test', function (req, res, next) {
    // res.render('index', { title: '页面测试' });
    res.send("hello test");
});

module.exports = r;
