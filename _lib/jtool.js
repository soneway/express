//工具类
var jtool = (function () {

    //向客户端发送信息函数
    function send(res, data) {
        var query = res.query,
            callback = query.callback;

        //jsonp方式
        if (callback !== undefined) {
            res.send(callback(data));
        }
        else {
            res.send(data);
        }
    }

    return {
        send: send
    };

})();

module.exports = jtool;