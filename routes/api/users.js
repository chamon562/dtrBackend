require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const JWT_SECRET = process.env.JWT_SECRET;
const { registerValidation, loginValidation } = require("../../validation");
const passport = require("passport");
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
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // validation email and password
  //   const { error } = loginValidation(req.body);
  //   if (error) {
  //     return res.status(400).send(error.details);
  //   }
  // find a user by email
  db.User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).json({ message: "Email or password is incorrect" });
    } else {
      // Check password with bcrypt
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          //   if User isMatch then send Jsonwebtoken
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          //   Sign token
          jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
            res.json({ sucess: true, token: `Bearer ${token}` });
          });
        } else {
          return res
            .status(400)
            .send({ message: "Email or password is incorrect" });
        }
      });
    }
  });
  // res.json("login route connected🎈")
});

// GET current user info (private)
// to get the authorization shown in postman
// make sure go to Auth tab drop down menu Bearer Token and to the right where it says token
// copy paste the given token of the user
// should return :
// }
// "id": "61943e6f21685d662b5f3dee",
//     "name": "newuser",
//     "email": "newuser@gmail.com"
// }
// the route is http://localhost:8000/api/users/current
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

// Edit user by id
router.put("/:id", (req, res) => {
  db.User.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  )
    .then((updatedUser) => {
      console.log(updatedUser);
      res.send(updatedUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(503).send({ message: "Server error" });
    });
});

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
