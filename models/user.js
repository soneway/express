var mongodb = require('../db');

function User(user) {
    this.uid = user.uid;
    this.pwd = user.pwd;
    this.email = user.email;
}

module.exports = User;

User.prototype.save = function (cb) {

};

User.get = function (uid, cb) {
    mongodb.open(function (err, db) {
        db.collection('user', function (err, collection) {
            collection.findOne({
                uid: uid
            }, function (err, doc) {
                mongodb.close();
                cb(null, doc);
            });
        });
    });
};