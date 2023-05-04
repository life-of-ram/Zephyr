const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/business.html", function(req, res) {
  res.sendFile(__dirname + "/business.html");
});

app.get("/individuals.html", function(req, res) {
  res.sendFile(__dirname + "/individuals.html");
});

app.get("/signup.html", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/about.html", function(req, res) {
  res.sendFile(__dirname + "/about.html");
});

app.post("/signup.html", function(req, res) {
  const email = req.body.Email;
  const name = req.body.Name;
  const phone = req.body.Phone;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        PHONE: phone
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us13.api.mailchimp.com/3.0/lists/8a5bb2de29";
  var totalCreated = data.total_created;
  const options = {
    method: "POST",
    auth: "sriramnath:184777c13423d9dab4ee89843751ebc0-us13"
  }
  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      if (totalCreated !== 0) {
        res.sendFile(__dirname+"/thanks.html");
      } else {
        console.log("error");
      }
    })
  })
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 4000, function() {
  console.log("Server is running at port 4000");
});

