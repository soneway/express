var Article = require('../models/article');
var jtool = require('jtool');

module.exports = {
    get: function (req, res) {
        jtool.send(res, {
            status: 200,
            data  : req.session.user
        });
    }
};
