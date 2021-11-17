require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const { urlencoded } = require("express");
const users = require("./routes/api/users");
// middlware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// passport middleware
app.use(passport.initialize());
// import passport file into server
require("./config/passport")(passport);


app.use("/api/users", users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `✨ Server now running on localhost:${PORT}, we live on cmLive ✨`
  );
});
