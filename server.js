// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API timestamp fcc challenge...
app.get("/api/timestamp/:date_string?", function(req, res, next) {
    
    var date = req.params['date_string'];
  
    if (date === undefined) {
      date = new Date();
    } else if ((/\d{4}[-]\d{2}[-]\d{2}/).test(date)) {
      date = new Date(date);
    } else if (Number(date)) {
      date = parseInt(date);
      date = new Date(date);
    } else {
      req.error = true;
    }
  
    if (!req.error) {
      req.unix = date.getTime();
      req.utc = date.toUTCString();
    }
    
    next();
}, function(req, res) {
    if(req.error) {
      res.json({error: 'Invalid Date'});
    } else {
      res.json({unix: req.unix, utc: req.utc});
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});