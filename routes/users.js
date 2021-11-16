const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/test", (req, res) => {
  res.json("users test route is working 😸");
});

module.exports = router;
