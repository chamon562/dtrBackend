const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true
    },
    friendId:{
      type: String,
      required: true,
      unique: true,
    },
    turboRank:{
      type: Number,
      default: 2000
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
