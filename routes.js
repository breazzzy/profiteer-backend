const config = require("./config/config");

const yfinance = require("yahoo-finance2").default;

//Turns off validation for yfinance2 was having a lot of trouble with it. Parameter located in config
const validation = config.yfin.validation;

const AuthenticationController = require("./controllers/AuthenticationController");
const BuySellController = require("./controllers/BuySellController");

//Collections of all the routes the server can go

module.exports = (app) => {
  app.get("/status", (req, res) => {
    res.send({
      message: "hello world",
    });
  });

  app.post("/register", AuthenticationController.register);
  app.post("/login", AuthenticationController.login);
  app.post("/watch", BuySellController.addToWatch);
  app.post("/get_watch", BuySellController.getWatches);
  app.post("/buy", BuySellController.addToBuy);
  app.post("/get_buys", BuySellController.getBuys);
  app.post("/sell", BuySellController.sellStock);
  app.post("/balance", AuthenticationController.get_balance);

  app.post("/stock_info", async (req, res) => {
    // const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
    console.log(req.body.sym);
    try {
      const result = await yfinance.quote(
        req.body.sym,
        {},
        { validateResult: validation }
      );
      res.send({
        message: result,
      });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  });

  app.post("/stock_info_chart", async (req, res) => {
    //   const queryOptions = { lang: "en-US", reportsCount: 2, region: "US" };
    console.log("Responding with history for " + req.body.sym);
    try {
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
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });
};
