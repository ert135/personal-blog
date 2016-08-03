var express = require('express');
var path = require('path');
var app = express();
var angularApp = "../index.html"

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/../public'));
app.use('/static', express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/../node_modules'));
app.use('/static', express.static(__dirname + '/node_modules'));

app.use(express.static(__dirname + '/../app'));
app.use('/static', express.static(__dirname + '/app'));

app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'node_modules')));

app.listen(80, function() {
    console.log('blog front end app listening on port 4000');
    console.log(path.join(__dirname, '/../node_modules'));
    console.log(path.join(__dirname + '/../app/build'));
});