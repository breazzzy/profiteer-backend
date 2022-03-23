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
};
