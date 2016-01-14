var User = require('../models/user');
var jtool = require('jtool');

module.exports = {

    //获取用户信息
    get: function (req, res) {
        jtool.send(res, {
            status: 200,
            data  : req.session.user
        });
    },

    //添加用户
    post: function (req, res) {

    }
};
