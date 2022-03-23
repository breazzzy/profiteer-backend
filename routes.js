const config = require("./config/config");

const yfinance = require("yahoo-finance2").default;
const validation = config.yfin.validation;

const AuthenticationController = require("./controllers/AuthenticationController");

module.exports = (app) => {
  app.get("/status", (req, res) => {
    res.send({
      message: "hello world",
    });
  });

  app.post("/register", AuthenticationController.register);

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
};
