const config = require("./config/config");

const yfinance = require("yahoo-finance2").default;

//Turns off validation for yfinance2 was having a lot of trouble with it. Parameter located in config
const validation = config.yfin.validation;

const AuthenticationController = require("./controllers/AuthenticationController");
const BuySellController = require("./controllers/BuySellController");
const isAuthenticated = require("./Policies/isAuthenticated");

//Collections of all the routes the server can go

module.exports = (app) => {
  app.get("/status", (req, res) => {
    res.send({
      message: "hello world",
    });
  });

  //Any post with an isAuthenticated function passed in is one where a login is required in order to access.
  app.post("/register", AuthenticationController.register);
  app.post("/login", AuthenticationController.login);
  app.post("/watch", isAuthenticated, BuySellController.addToWatch);
  app.post("/get_watch", isAuthenticated, BuySellController.getWatches);
  app.post("/buy", isAuthenticated, BuySellController.addToBuy);
  app.post("/get_buys", isAuthenticated, BuySellController.getBuys);
  app.post("/sell", isAuthenticated, BuySellController.sellStock);
  app.post("/balance", isAuthenticated, AuthenticationController.get_balance);
  app.post("/desc", BuySellController.getDescription);

  app.post("/stock_info", async (req, res) => {
    // const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
    console.log(req.body.sym);
    try {
      const result = await yfinance.quote(
        req.body.sym,
        {},
        { validateResult: validation }
      );
      console.log("result for stock info = " + result);
      if (!result) {
        throw "undefined";
      }
      res.send({
        message: result,
      });
    } catch (error) {
      res.status(400).send("Search not found");

      console.log("ERROR Search not found");
    }
  });

  app.post("/stock_info_chart", async (req, res) => {
    //   const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
    console.log("Responding with history for " + req.body.sym);
    try {
      const result = await yfinance._chart(
        req.body.sym,
        {
          //This is how far back we go to get data
          // period1: "2022-02-01" /* ... */,
          period1: req.body.period,
        },
        { validateResult: validation }
      );
      res.send({
        message: result.quotes,
      });
    } catch (error) {
      res.status(400).send("Search not found");

      console.log("ERROR Search not found");
    }
  });
};
