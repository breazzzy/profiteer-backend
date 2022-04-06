const passport = require("passport");
const User = require("./models/index").User;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require("./config/config");

console.log("passport strategy loading...");
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.authentication.jwtKey,
    },
    async function (jwtPayload, done) {
      try {
        // console.log("JWT PAYLOAD " + jwtPayload);
        // console.log(jwtPayload);
        const user = await User.findOne({
          where: {
            username: jwtPayload.username,
          },
        });
        if (!user) {
          return done(new Error("Token Not Valid"), false);
        }
        return done(null, user);
        // console.log(user.toJSON());
      } catch (error) {
        return done(new Error("Token Not Valid"), false);
      }
    }
  )
);
