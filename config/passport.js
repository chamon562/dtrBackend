require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");

// options is object literal containg options to control
// how token is extract from teh request or verified
const opetions = {};
