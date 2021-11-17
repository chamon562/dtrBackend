require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");

// options is object literal containg options to control
// how token is extract from teh request or verified
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET || "tooted&booted";

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      db.User.findById(jwt_payload.id)
        // jwt_payload is an object literal containing the decoded JWT
        // payload, done is a passport callback that has error first as an argument  done(error, user, info)
        .then((user) => {
          if (user) {
            // if the user is found, return muill (for error) and user
            return done(null, user);
          } else {
            // if no user is found
            return done(null, false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
  );
};
