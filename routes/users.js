const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Postman http://localhost:8000/api/users/test
router.get("/test", (req, res) => {
  res.json("users test route is working 😸");
});

module.exports = router;
