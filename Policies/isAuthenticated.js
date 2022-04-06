const passport = require("passport");

//Function called to check token being received
module.exports = isAuthenticated = function (req, res, next) {
  // console.log(req);
  // console.log(req);
  passport.authenticate("jwt", function (err, user) {
    if (err || !user) {
      // console.log(
      //   "faetmapefvmodnguernvidfmvodrsnvdfvnodfsnvodfsnvosdfivnuiersnpv"
      // );

      res.status(403).send("Error");
    } else {
      console.log("TOKEN WAS AUTHENTICATED");
      req.user = user;
      next();
    }
  })(req, res, next);
};
