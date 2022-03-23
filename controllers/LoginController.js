
const User = require("../models/index").User;

//Registration logic
module.exports = {
  async login(req, res) {
      const creds = await User.findOne({where: {username: req.body.username} } ).then(user => {return user});
      console.log(creds.password + " " + req.body.password);
      if(creds.password == req.body.password){
        res.send({message: `${creds.username} logged in`, success: true} );
        console.log("successful login")
      }else{
        res.send({message: `Wrong Password`,success: false});
          console.log("wrong password")
      }
    // try {
    //   console.log(req.body);
    //   const user = await User.create(req.body);
    //   console.log(user.toJSON());
    //   res.send(user.toJSON());
    // } catch (err) {
    //   console.log("This username is allready in use");
    //   res.status(400).send({
    //     error: "This username is allready in use",
    //   });
    // }
  },
};
