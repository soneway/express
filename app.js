var express = require('express');
var app = express();
var jtool = require('jtool');


//解析ajax请求的application/x-www-form-urlencoded数据,不然req.body无法获取
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//session
var session = require('express-session');
app.use(session({
    secret           : 'express',
    key              : 'express',
    resave           : true,
    saveUninitialized: true,
    cookie           : {
        maxAge: (1000 * 60 * 60) * 24
    }
}));


//全局的错误处理函数
global.errorHandler = function (err, res) {
    jtool.send(res, {
        status: 500,
        msg   : err.message
    });
};


//需要登陆拦截的path
var loginPaths = ['/loginfo', '/user'],
//不要登陆拦截的path
    nologinPaths = ['/login', '/register'];
//登陆拦截
app.use('/*', function (req, res, next) {
    var path = req.baseUrl;

    //不需要登陆拦截的
    if (nologinPaths.indexOf(path) !== -1) {
        return next();
    }

    //需要登陆拦截的
    if (loginPaths.indexOf(path) !== -1) {
        if (!req.session.user) {
            return jtool.send(res, {
                status: 401,
                msg   : '未登陆'
            });
        }
        next();
    }

    //其他默认为不是get都拦截下
    if (req.method !== 'GET') {
        if (!req.session.user) {
            return jtool.send(res, {
                status: 401,
                msg   : '未登陆'
            });
        }
    }
    next();
});


//路径响应
app.use('/*', function (req, res) {
    //预防未知路径
    var router;
    try {
        router = require('./routes' + req.baseUrl);
    }
    catch (e) {
        return jtool.send(res, {
            status: 404,
            msg   : '未知路径'
        });
    }

    //请求响应函数
    var cb = router[req.method.toLowerCase()];
    //未知的method
    if (typeof cb !== 'function') {
        return jtool.send(res, {
            status: 404,
            msg   : '未知方法'
        });
    }
    cb(req, res);
});


app.listen(3000);

module.exports = app;