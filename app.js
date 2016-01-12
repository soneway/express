var express = require('express');
var app = express();
var jtool = require('./_lib/jtool');


app.use('/*', function (req, res, next) {
    //预防未知路径
    var router;
    try {
        router = require('./routes' + req.baseUrl);
    }
    catch (e) {
        jtool.send(res, {
            status: 404,
            msg   : '未知路径'
        });
        return;
    }

    var fn,
        method = req.method;
    switch (method) {
        //查询
        case 'GET':
        //新建
        case 'POST':
        //更新(完整信息)
        case 'PUT':
        //更新(改变属性)
        case 'PATCH':
        //删除
        case 'DELETE':
        {
            fn = router[method.toLowerCase()];
            break;
        }
        //其他
        default:
        {
            fn = router.callback;
            res.send('default');
        }
    }
    //未知的method
    if (typeof fn !== 'function') {
        jtool.send(res, {
            status: 404,
            msg   : '未知方法'
        });
        return;
    }
    fn(req, res, next);
});


app.listen(3000);

module.exports = app;