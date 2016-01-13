var express = require('express');
var app = express();
var jtool = require('jtool');


//登陆拦截
app.use(function (req, res, next) {
    //不是get都拦截下
    if (req.method !== 'GET') {
        var uid = req.session && req.session.uid;
        if (!uid) {
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