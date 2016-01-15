//用户注册

var User = require('../models/user');
var jtool = require('jtool');


module.exports = {

    post: function (req, res) {
        var newUser = new User(req.body);

        User.get({uid: newUser.uid}, function (err, user) {
            if (err) return errorHandler(err, res);

            if (user) {
                return jtool.send(res, {
                    status: 400,
                    msg   : '用户已存在'
                });
            }

            newUser.add(function (err, user) {
                if (!user) {
                    return jtool.send(res, {
                        status: 500,
                        msg   : '添加用户失败'
                    });
                }

                req.session.user = user;
                jtool.send(res, {
                    status: 200,
                    data  : user
                });
            });
        });
    }

};
