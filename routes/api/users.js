const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../../models");
// const User = require("../models/User");
// Postman http://localhost:8000/api/users/test
router.get("/test", (req, res) => {
  res.status(200).json("users test route is working 😸");
});

router.post("/register", (req, res) => {
  // find user by email
  db.User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json("Email already exist");
    } else {
        
        // creating a new user
        const newUser = new db.User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        // adding bcrypt to hash password
        // generating salt
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          // change the password to hash
          newUser.password = hash;
          newUser
            .save()
            .then((createdUser) => res.json(createdUser))
            .catch((err) => res.json(err));
        });
      });
    }
  });
});

module.exports = router;
