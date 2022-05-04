const passport = require("passport");
const User = require("./models/index").User;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require("./config/config");

console.log("passport strategy loading...");
// This creates a JWT strategy that assures the user requesting data is authenticated
// If the users JWT is valid it returns the users database entry and passes it to the next funciton in the route
//This function is called for every request, only routes that called the isAuthenticated function will use the user (or error) returned here
//Uses http://www.passportjs.org/packages/passport-jwt/ documentation extensivley.
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.authentication.jwtKey,
    },
    async function (jwtPayload, done) {
      try {
        const user = await User.findOne({
          where: {
            username: jwtPayload.username,
          },
        });
        if (!user) {
          return done(new Error("Token Not Valid"), false);
        }
        return done(null, user);
      } catch (error) {
        return done(new Error("Token Not Valid"), false);
      }
    }
  )
);
