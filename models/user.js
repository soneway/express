var db = require('../db')('user');

function User(user) {
    this.uid = user.uid;
    this.pwd = user.pwd;
    this.email = user.email;
}

module.exports = User;

User.prototype.save = function (cb) {
    var user = this;
    mongodb.open(function (err, db) {
        db.collection('user', function (err, collection) {
            collection.insert(user, {
                safe: true
            }, function (err, doc) {
                mongodb.close();
                cb(null, doc);
            });
        });
    });
};

User.get = function (doc, cb) {
    db.get(doc, cb);
};