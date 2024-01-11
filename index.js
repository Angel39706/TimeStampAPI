// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//Time stamp endpoint to display time in unix and utc using Express.js
app.get("/api/:date?", function (req, res) {
  let inputDate;

  if (req.params.date) {
    inputDate = isNaN(req.params.date) ? new Date(req.params.date): new Date(Number(req.params.date));
  } else {
    inputDate = new Date();
  }

  if (isNaN(inputDate)) {
    return res.json({ error: "Invalid Date" });
  }

  const unixTimestamp = inputDate.getTime();
  const utcString = inputDate.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcString });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
