const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../../models");
const { registerValidation } = require("../../validation");
// const User = require("../models/User");
// Postman http://localhost:8000/api/users/test
router.get("/test", (req, res) => {
  res.status(200).json("users test route is working 😸");
});

// REGISTER a USER
// Postman route http://localhost:8000/api/users/register
router.post("/register", (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // find user by email
  db.User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json("Email already exist");
    } else {
      // creating a new user
      const newUser = new db.User({
        name: req.body.name.toLowerCase(),
        email: req.body.email.toLowerCase(),
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
            .catch((error) => res.json(error));
        });
      });
    }
  });
});

// LOGIN ROUTE
router.post("/login", (req, res ) =>{
    
    // res.json("login route connected🎈")
})

//Postman route http://localhost:8000/api/users/6193f7c1975bdb73c252666f
router.delete("/:id", (req, res) => {
  db.User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json({ message: "User has been deleted" });
      console.log("User deleted");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
