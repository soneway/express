var jtool = require('jtool');

module.exports = {
    get: function (req, res) {
        req.session.user = null;
        jtool.send(res, {
            status: 200
        });
    }
};
