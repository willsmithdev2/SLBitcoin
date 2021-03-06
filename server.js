var express = require('express')
var bodyParser = require('body-parser')
var bitCoinChecker = require("./bitcoin.js");

var app = express()
app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/api/validate-hash', function (req, res) {
  var isValidHash=bitCoinChecker.checkHash(req.body);
  res.json([
    {
      isHashValid: isValidHash,
    }
  ])
  console.log("Is valid hash? "+ isValidHash);
})

app.listen(3000, function () {
  console.log('Server listening on', 3000)
})
