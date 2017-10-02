var express = require('express');
var path = require('path');
var app = express();
var angularApp = "../index.html"
var port = 8081;
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.use(express.static(__dirname + '/../dist'));
app.use('/static', express.static(__dirname + '/dist'));

app.use(express.static(__dirname + '/../dist/assets'));
app.use('/static', express.static(__dirname + '/dist/assets'));


app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../app/index.html'));
});

app.listen(port,   function() {
    console.log('blog front end app listening on port', port);
    console.log(path.join(__dirname, '/../node_modules'));
    console.log(path.join(__dirname + '/../app/build'));
});