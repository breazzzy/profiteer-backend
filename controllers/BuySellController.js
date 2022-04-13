const { create } = require("domain");

const User = require("../models/index").User;
const Watch = require("../models/index").Watch;
const Buy = require("../models/index").Buy;
const Sell = require("../models/index").Sell;
const yfinance = require("yahoo-finance2").default;

const config = require("../config/config");

//Registration logic
module.exports = {
  //Watches
  async addToWatch(req, res) {
    try {
      // console.log(req.body.data);
      const watch = await Watch.create({
        stockTicker: req.body.data.stockTicker,
        username: req.body.data.username,
      });
      // console.log(watch.toJSON());
      res.send(watch.toJSON());
    } catch (err) {
      res.send("Stock allready on list");
      console.log("ERROR: " + err);
    }
  },
  async getWatches(req, res) {
    try {
      // console.log("GET WATCHES " + req.body);
      const { username } = req.user;
      // console.log("USERNAME " + username);
      const watch = await Watch.findAll({ where: { username: username } });
      // console.log(watch);
      res.send(watch);
    } catch (error) {
      res.send(error);
      console.log("ERROR ON GET WATCHES : " + error);
    }
  },
  //Buys
  async addToBuy(req, res) {
    try {
      const buy = await Buy.create(req.body.data);
      res.send(buy);
    } catch (err) {
      res.send(err);
      console.log("ERROR: " + err);
    }
  },
  async getBuys(req, res) {
    try {
      const { username } = req.user;
      const buys = await Buy.findAll({ where: { username: username } });
      // console.log(buys);
      res.send(buys);
    } catch (err) {
      console.log("ERROR: " + err);
    }
  },
  //Sells
  async sellStock(req, res) {
    console.log("SELL REQUEST");
    console.log(req.body.data);
    const { username, stockTicker, createdAt, amountBought, priceAtBuy } =
      req.body.data;
    //First we will find the buy
    try {
      const original_buy = await Buy.findOne({
        where: { username: username, createdAt: createdAt },
      });
      // console.log("Buy found " + original_buy);
      //Create sell in database
      const quote = await yfinance.quote(
        req.body.data.stockTicker,
        {},
        { validateResult: config.yfin.validation }
      );
      const { regularMarketPrice } = quote; //This is the current price
      // console.log("Current price " + regularMarketPrice);

      const sell = await Sell.create({
        stockTicker: stockTicker,
        username: username,
        priceAtSell: regularMarketPrice,
        priceAtBuy: priceAtBuy,
        amountSold: amountBought,
      });
      //Find profit
      const profit = (regularMarketPrice - priceAtBuy) * amountBought;
      console.log(
        "Profit = " + priceAtBuy + " - " + regularMarketPrice + " = " + profit
      );
      //Add profit to balance of user
      const user = await User.findOne({ where: { username: username } });
      user.balance = user.balance + profit;
      await user.save();
      //Delete original buy
      await Buy.destroy({
        where: {
          createdAt: createdAt,
        },
      });
      //return profit to client and add it to user account in database
      res.send({ profit, priceAtBuy, regularMarketPrice, amountBought });
    } catch (error) {
      console.log(error);
    }
  },
  async getDescription(req, res) {
    try {
      console.log(req.body);
      const desc = await yfinance.quoteSummary(req.body.sym, {
        modules: ["assetProfile"],
        // validateResult: config.yfin.validation,
      });
      res.send(desc.assetProfile);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};
