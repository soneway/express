var mongodb = require('../db');

function Article(user) {
    this.uid = user.uid;
    this.pwd = user.pwd;
    this.email = user.email;
}

module.exports = Article;

Article.prototype.save = function (cb) {

};

Article.get = function (uid, cb) {
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