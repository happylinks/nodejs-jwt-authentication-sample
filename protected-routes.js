var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config'),
    quoter  = require('./quoter');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret,
  // Important
  getToken: function (req) {
    const token = req.cookies.authorization;
    return token;
  },
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});
