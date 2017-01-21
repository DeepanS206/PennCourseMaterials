var express = require('express');
var http = require('http');
var app = express();

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('login.ejs');
});

console.log('Author: Deepan Saravanan (deepans)');
http.createServer(app).listen(process.env.PORT || 8080)
console.log('Server running on port 8080. Now open http://localhost:8080/ in your browser!');
