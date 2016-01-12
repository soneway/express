var express = require('express');
var app = express();


app.use('/*', function (req, res, next) {
    var url = req.originalUrl;

    //未知路径
    var router;
    try {
        router = require('./routes' + url);
    }
    catch (e) {
        res.send({
            status: 404,
            msg   : '未知路径'
        });
        return;
    }

    var fn;
    switch (req.method) {
        //查询
        case 'GET':
        {
            fn = router.get;
            break;
        }
        //新建
        case 'POST':
        {
            fn = router.post;
            break;
        }
        //更新(完整信息)
        case 'PUT':
        {
            fn = router.put;
            break;
        }
        //更新(改变属性)
        case 'PATCH':
        {
            fn = router.patch;
            break;
        }
        //删除
        case 'DELETE':
        {
            fn = router.delete;
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
        return;
    }
    fn(req, res, next);
});

app.listen(3000);

module.exports = app;