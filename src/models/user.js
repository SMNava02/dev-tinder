const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
