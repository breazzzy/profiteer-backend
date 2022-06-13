const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { sequelize } = require("./models");
const config = require("./config/config");

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

require("./passport"); // Loads my passport strategy
//Used for Json Web Token
//Way we create a session for a logged in user

//Make the server
require("./routes")(app);
var server;
var port = process.env.PORT || process.env.NODE_PORT || config.port;

//Start database and then start server
sequelize.sync().then(() => {
  server = app.listen(port, function (err) {
    if (err) throw err;
    console.log("Listening on port: " + port);
  });
});

// async function get_stock_info() {
//   const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
//   const result = await yfinance.insights("AYX", queryOptions);
//   return result.data;
// }
