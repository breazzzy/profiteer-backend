const path = require("path");

var router = function (app) {
  app.get("/", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../write-library.html"));
  });

  app.get("/write-library", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../write-library.html"));
  });
};

module.exports = router;
