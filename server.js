const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const { sequeilize } = require("./models");
const config = require("./config/config");

const yfinance = require("yahoo-finance2").default;

//USED TO TURN VALIDATION ON/OFF
const validation = false;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("combined"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//Make the server
var server;
var port = process.env.PORT || process.env.NODE_PORT || 5000;

// //Page Listeners (Router)

// var router = require("./router.js");
// router(app);

//Service Listeners (Services)

app.get("/status", (req, res) => {
  res.send({
    message: "hello world",
  });
});

app.post("/register", (req, res) => {
  console.log(req);
  res.send({
    message: "" + req.body.username + " your user was registered",
  });
});

app.post("/stock_info_test", async (req, res) => {
  // const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };

  console.log(req.body.sym);
  const result = await yfinance.quote(
    req.body.sym,
    {},
    { validateResult: validation }
  );
  res.send({
    message: result,
  });
});

app.get("/test", async (req, res) => {
  // const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };

  console.log("Test");
  const result = await yfinance.quote(
    "AAPL",
    {},
    { validateResult: validation }
  );
  res.send({
    message: result,
  });
});

app.get("/test_day", async (req, res) => {
  // const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
  let date = new Date();
  console.log("Test");
  const result = await yfinance._chart(
    "AAPL",
    { period1: "2022-02-09" },
    { validateResult: validation }
  );
  res.send({
    message: result,
  });
});

app.post("/stock_info_chart", async (req, res) => {
  //   const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
  console.log("Responding with history for " + req.body.sym);
  const result = await yfinance._chart(
    req.body.sym,
    {
      period1: "2022-02-01" /* ... */,
    },
    { validateResult: validation }
  );
  res.send({
    message: result.quotes,
  });
});

//Start database and then start server
sequeilize.sync().then(() => {
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
