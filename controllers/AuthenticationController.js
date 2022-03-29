const User = require("../models/index").User;

//Registration logic
module.exports = {
  async register(req, res) {
    try {
      console.log(req.body);
      const user = await User.create(req.body);
      console.log(user.toJSON());
      res.send(user.toJSON());
    } catch (err) {
      console.log("This username is allready in use");
      res.status(400).send({
        error: "This username is allready in use",
      });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log(username);
      const user = await User.findOne({
        where: { username: username },
      });
      if (!user) {
        return res.status(403).send({
          error: "Login not found",
        });
      }
      console.log(user.toJSON());
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "Login not found",
        });
      }
      res.send({
        user: user.toJSON(),
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured",
      });
    }
  },
};
