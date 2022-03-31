const User = require("../models/index").User;
const Watch = require("../models/index").Watch;
const Buy = require("../models/index").Buy;

//Registration logic
module.exports = {
  //Watches
  async addToWatch(req, res) {
    try {
      // console.log(req.body.data);
      const watch = await Watch.create(req.body.data);
      // console.log(watch.toJSON());
      res.send(watch.toJSON());
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
  },
  async getWatches(req, res) {
    try {
      console.log(req.body);
      const { username } = req.body;
      const watch = await Watch.findAll({ where: { username: username } });
      console.log(watch);
      res.send(watch);
    } catch (error) {
      console.log("ERROR: " + error);
    }
  },
  //Buys
  async addToBuy(req, res) {
    try {
      const buy = await Buy.create(req.body.data);
      res.send(buy);
    } catch (err) {
      console.log("ERROR: " + err);
    }
  },
  async getBuys(req, res) {
    try {
      const { username } = req.body;
      const buys = await Buy.findAll({ where: { username: username } });
      console.log(buys);
      res.send(buys);
    } catch (err) {
      console.log("ERROR: " + err);
    }
  },
};
