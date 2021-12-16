require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const { urlencoded } = require("express");
const users = require("./routes/api/users");
// middlware

app.use(
  cors({
    origin: "*",
  })
  
);
// setting up a whitelist and check against it

// let whiteList = ["http://localhost:3000", "https://api.opendota.com"];
// let corsOptions = {
//   // origin: function (origin, callback) {
//   //   if (whiteList.indexOf(origin) !== -1) {
//   //     callback(null, true);
//   //   } else {
//   //     callback(new Error("Not allowed by CORS"));
//   //   }
//   // },
//   origin: ["https://api.opendota.com", "http://localhost:3000"],
  
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// Access to XMLHttpRequest at 'https://api.opendota.com/api/players/179940588' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
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
