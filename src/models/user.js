const mongoose = require("mongoose");
const validator = require("validator");

let userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error(
            "Pls provide a valid gender. Options are [male, female, others]"
          );
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email ID is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
