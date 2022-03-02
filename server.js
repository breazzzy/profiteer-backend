const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const { resolve } = require("path/posix");

const yfinance = require("yahoo-finance2").default;

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
    message: "Yo " + req.body.username + " your user was registered",
    // message: req.body,
  });
});

app.post("/stock_info_test", async (req, res) => {
  // const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };

  console.log(req.body.sym);
  const result = await yfinance.quote(req.body.sym);
  res.send({
    message: result,
  });
});

// const get_stock_info = async (symbol) => {
//   var promise = () => {
//     return new Promise((resolve, reject) => {
//       yfinance.quote(symbol);
//     });
//   };
// };

app.post("/stock_info_test_post", (req, res) => {
  // const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
  //   const p = getter(req.body.sym);
  console.log(req.body.sym);
  res.send({ message: "Hhel " + req.body.sym + " f" });
  //   const result = await yfinance.quote("GME");
  //   res.send({
  //     message: result,
  //   });
});

// const getter = async (symbol) => {
//   var promise = () => {
//     return new Promise((resolve, reject) => {
//       yfinance.quote(symbol);
//     });
//   };
// };

app.get("/stock_info", (req, res) => {
  res.send({
    message: "hello",
  });
});

app.post("/stock_info_chart", async (req, res) => {
  //   const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
  console.log(req.body.sym);
  const result = await yfinance._chart(req.body.sym, {
    period1: "2022-02-01" /* ... */,
  });
  res.send({
    message: result.quotes,
  });
});

server = app.listen(port, function (err) {
  if (err) throw err;
  console.log("Listening on port: " + port);
});

// async function get_stock_info() {
//   const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
//   const result = await yfinance.insights("AYX", queryOptions);
//   return result.data;
// }
