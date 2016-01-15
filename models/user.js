var db = require('../db')('user');

function User(user) {
    this.uid = user.uid;
    this.pwd = user.pwd;
    this.email = user.email;
}

module.exports = User;

//添加用户
User.prototype.add = function (cb) {
    db.add(this, cb);
};

//获取单个用户
User.get = function (query, cb) {
    db.get(query, cb);
};

//编辑
User.edit = function (query, doc, cb) {

    //删除不可修改的信息
    delete doc._id;
    delete doc.uid;

    db.edit(query, doc, cb);
};