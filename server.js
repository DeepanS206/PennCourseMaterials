var express = require('express');
var http = require('http');
var bodyParser = require('body-parser'); 
var mongodb = require('./models/app.js'); 
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

/*{ reg_username: 'Deepan',
  reg_password: '',
  reg_password_confirm: '',
  reg_email: '',
  reg_fullname: '' }*/

app.get('/home', function(req, res) {
  res.render('home.ejs');
});

app.post('/addUser', function(req, res) {
  if (req.body.reg_password === req.body.reg_password_confirm) {
    mongodb.addUser(req.body.reg_username, 
    req.body.reg_password, req.body.reg_fullname, 
    req.body.reg_email, function(err, r) {
      if (!err) {
        res.redirect('/home');
      }
    });
  } else {
    console.log('pw do not match');
    res.redirect('/');
  }
});

app.get('/', function(req, res) {
  res.render('login.ejs');
});

console.log('Author: Deepan Saravanan (deepans)');
http.createServer(app).listen(process.env.PORT || 8080)
console.log('Server running on port 8080. Now open http://localhost:8080/ in your browser!');
