//用户登陆

var User = require('../models/user');
var jtool = require('jtool');


module.exports = {

    post: function (req, res) {
        var uid = req.body.uid,
            pwd = req.body.pwd;

        User.get({uid: uid}, function (err, user) {
            if (err) return errorHandler(err, res);

            if (!user) {
                return jtool.send(res, {
                    status: 401,
                    msg   : '用户名不存在'
                });
            }
            if (user.pwd !== pwd) {
                return jtool.send(res, {
                    status: 401,
                    msg   : '密码错误'
                });
            }

            req.session.user = user;
            jtool.send(res, {
                status: 200,
                data  : user
            });
        });
    }

};
