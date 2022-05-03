var express = require("express");
var bodyParser = require("body-parser");
var app = express();
// enviroment variable. Inside Replit is a secret
const mySecret = process.env["MESSAGE_STYLE"];

function middleWare(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/json", middleWare);
// middleware use to change a relative path into a absolute
// this line allow us to read the css file and style our html document
// it happens because our html document has a reference to the css file.
app.use("/public", express.static(__dirname + "/public"));

function handler(req, res) {
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
}

function handlerJson(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
}

app.get("/", handler);

app.get("/json", handlerJson);

// add middleware directly in the route method
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});

app
  .route("/name")
  .get(function (req, res) {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
  })
  .post(function (req, res) {
    const { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });

module.exports = app;
