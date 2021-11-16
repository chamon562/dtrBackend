require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { urlencoded } = require("express");

// middlware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// Mongoose connection project
const db = mongoose.connection;

db.once("open", () => {
  console.log(`Connected to MongoDB at ${db.host}, port: ${db.port}`);
});
db.on("error", (error) => {
  console.log(`Database error\n ${error}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `✨ Server now running on localhost:${PORT}, we live on cmLive ✨`
  );
});
