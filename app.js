var express = require('express');
var app = express();

app.use('/name', function (req, res) {
    res.send(req.path)
});

app.use('/*', require('./routes/*'));

app.listen(3000);