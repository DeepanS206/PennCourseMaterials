var express = require('express');
var http = require('http');
var bodyParser = require('body-parser'); 
var cookieSession = require('cookie-session'); 
var mongodb = require('./models/app.js'); 
var app = express();

var generateCookieSecret = function () {
  return 'iamasecret' + uuid.v4();
};

app.use(cookieSession({
  secret: generateCookieSecret()
})); 

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

app.get('/home/:fullname', function(req, res) {
  res.render('home.ejs', {'data': req.params.fullname});
});

app.get('/addCourse', function(req, res) {

});

app.post('/login', function(req, res) {
  mongodb.authenticate(req.body.lg_username, req.body.lg_password, function(err, name) {
    if (!err) {
      var queryStr = '/home/' + name;
      res.redirect(queryStr);
    } else {
      res.redirect('/');
    }
  });
});

app.post('/addUser', function(req, res) {
  if (req.body.reg_password === req.body.reg_password_confirm) {
    mongodb.addUser(req.body.reg_username, 
    req.body.reg_password, req.body.reg_fullname, 
    req.body.reg_email, function(err, r) {
      if (!err) {
        var queryStr = '/home/' + req.body.reg_fullname;
        res.redirect(queryStr);
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
