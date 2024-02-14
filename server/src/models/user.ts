const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"],
    },

    email: {
      type: String,
      required: [true, "email cannot be empty"],
      unique: [true, "user already exists"],
    },

    dob: {
      type: Date,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", Schema);
