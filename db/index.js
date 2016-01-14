'use strict';

var config = require('./config');
var mongodb = require('mongodb');

var Db = mongodb.Db,
    Server = mongodb.Server;

module.exports = function (collName) {

    //mongodb实例
    var mongodb = new Db(config.db, new Server(config.host, config.port), {
        safe: true
    });

    function errHander(err, cb) {
        if (err) {
            mongodb.close();
            return cb(err);
        }
    }

    return {
        //增
        add: function (doc) {
            mongodb.open(function (err, db) {

            });
        },

        //查1个
        get: function (query, cb) {
            new Promise(function (resolve) {
                mongodb.open(function (err, db) {
                    resolve(db);
                });
            }).then(function (db) {
                db.collection(collName, function (err, coll) {
                    return coll;
                });
            }).then(function (coll) {
                coll.findOne(query, function (err, doc) {
                    cb(null, doc);
                });
            });

            //mongodb.open(open);
            //
            //function open(err, db) {
            //    errHander(err, cb);
            //    db.collection(collName, collection);
            //}
            //
            //function collection(err, coll) {
            //    errHander(err, cb);
            //    coll.findOne(query, findOne);
            //}
            //
            //function findOne(err, doc) {
            //    errHander(err, cb);
            //    cb(null, doc);
            //}
        }
    };
};
