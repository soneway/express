var config = require('./config');
var mongodb = require('mongodb');

var Db = mongodb.Db,
    Server = mongodb.Server;

module.exports = function (collName) {

    //mongodb实例
    var mongodb = new Db(config.db, new Server(config.host, config.port), {
        safe: true
    });

    //错误处理函数
    function onerror(err, cb) {
        mongodb.close();
        cb(err);
    }

    //打开数据集函数
    function openColl(cb) {
        //打开数据库
        mongodb.open(open);

        //打开数据库回调
        function open(err, db) {
            if (err) return onerror(err, cb);

            //打开数据集
            db.collection(collName, cb);
        }
    }

    return {
        //增
        add: function (doc, cb) {
            openColl(function (err, coll) {
                if (err) return onerror(err, cb);

                coll.insert(doc, function (err, rs) {
                    if (err) return onerror(err, cb);

                    mongodb.close();
                    cb(null, rs.ops[0]);
                });
            });
        },

        //查1个
        get: function (query, cb) {
            openColl(function (err, coll) {
                if (err) return onerror(err, cb);

                coll.findOne(query, function (err, doc) {
                    if (err) return onerror(err, cb);

                    mongodb.close();
                    cb(null, doc);
                });
            });
        },

        //改
        edit: function (query, doc, cb) {
            openColl(function (err, coll) {
                if (err) return onerror(err, cb);

                coll.update(query, {$set: doc}, function (err) {
                    if (err) return onerror(err, cb);

                    mongodb.close();
                    cb(null);
                });
            });
        }
    };
};
