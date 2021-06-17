const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     personalNumber: {
//         type: String,
//         required: true,
//     },
//     name: String,
//     email: String,
//     password: String,
//     phone: String,
//     picture: String,
//     myBillets: [],
  
//   });

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  personalNumber: String,
  phone: String,
  picture: String,
  myBillets: [],
  myHistory: []
});

module.exports = mongoose.model("users", UserSchema);
