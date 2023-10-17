const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: String,
  gender: String,
  dob: String,
  confPassword: String,
});

const UserModel = mongoose.model("users", userSchema,"register");
module.exports = UserModel;
