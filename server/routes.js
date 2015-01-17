var express = require("express");
var path = require("path");

var paths = require("./paths");

module.exports = function (app) {
  var angularApp;

  if (app.get("development")) {
    angularApp = express.static(paths.index);
  } else {
    angularApp = express.static(path.join(paths.index, "min"));
  }

  // static
  app.use("/static/", express.static(paths.build));
  app.use("/static/vendor/", express.static(path.join(paths.client, "vendor")));

  // everthing else respond with index (angular will handle 404)
  app.use("*", angularApp);
}
