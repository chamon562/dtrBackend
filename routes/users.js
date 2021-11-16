const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
// Postman http://localhost:8000/api/users/test
router.get("/test", (req, res) => {
  res.status(200).json("users test route is working 😸");
});


router.post("/register", (req, res) => {
    // find user by email
    User.findOne({ email: req.body.email })
    .then((user) => {
        if (user) {
            return res.status(400).json("Email already exist");
        } else {
            // creating a new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save()
            .then(createdUser => res.json(createdUser))
            .catch(err=> res.json(err))
        }
    }).catch((err) =>{
        res.status(400).json("Error trying to create a new user", err)
    });
});

module.exports = router;