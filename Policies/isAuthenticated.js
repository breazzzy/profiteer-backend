const passport = require("passport");

//Function called to check token being received
// If the funciton defined in passport.js returns a user the user paramenter here will equal that
//It will then pass over to the next function in the route
// If the passport.js function returns a error or a null user this function returns error
module.exports = isAuthenticated = function (req, res, next) {
  passport.authenticate("jwt", function (err, user) {
    if (err || !user) {
      
      res.status(403).send("User could not be authenticaed, please log out and back in");
    } else {
      console.log("TOKEN WAS AUTHENTICATED");
      req.user = user;
      next();
    }
  })(req, res, next);
};
