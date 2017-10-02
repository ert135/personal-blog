var express = require('express');
var path = require('path');
var expressStaticGzip = require("express-static-gzip");
var app = express();
var angularApp = "../index.html"
var port = 8081;
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/dist/index.html'));
});

app.use("/", expressStaticGzip(path.resolve(__dirname + '/dist')));

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/dist/index.html'));
});

app.listen(port, function() {
    console.log('blog front end app listening on port', port);
});