var myApp = require("./myApp");

var port = process.env.PORT || 3000;
myApp.listen(port, function () {
  console.log("Node is listening on port " + port + "...");
});
