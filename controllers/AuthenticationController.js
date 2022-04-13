const User = require("../models/index").User;
const config = require("../config/config");

const jwt = require("jsonwebtoken");
var crypto = require("crypto-js");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7; //Seconds in a week
  //How long untill key expires
  return jwt.sign(user, config.authentication.jwtKey, {
    expiresIn: ONE_WEEK,
  });
}

//Registration logic
module.exports = {
  async register(req, res) {
    try {
      // console.log(req.body);
      const { username, password } = req.body;
      const encrypted = crypto.SHA256(password, "key").toString();
      console.log("Encrypterino + " + encrypted);
      const user = await User.create({
        username: username,
        password: encrypted,
        balance: 0,
      });
      console.log(user.toJSON());
      res.send(user.toJSON());
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "This username is allready in use",
      });
    }
  },
  async get_balance(req, res) {
    try {
      const { username } = req.user;
      const balance = (
        await User.findOne({
          where: { username: username },
        })
      ).balance;
      res.send({ balance });
    } catch (error) {
      console.log(error);
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        where: { username: username },
      });
      if (!user) {
        return res.status(403).send({
          error: "Login not found",
        });
      }
      const encrypted = crypto.SHA256(password, "key").toString();
      const isPasswordValid = user.password === encrypted;
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "Login not found",
        });
      }
      res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON()),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "An error has occured",
      });
    }
  },
};
