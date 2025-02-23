const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    profilePicture: String,
  }, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;