//用户

var User = require('../models/user');
var jtool = require('jtool');

module.exports = {

    //编辑用户
    put: function (req, res) {
        var newUser = new User(req.body);

        //从session读取uid
        var uid = req.session.user.uid;

        User.edit({uid: uid}, newUser, function (err) {
            if (err) return errorHandler(err, res);

            jtool.send(res, {
                status: 200
            });
        });
    }
};
