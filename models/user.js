// Define a schema for users
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
  });
  
  // Create a model for users
  const User = mongoose.model('User', userSchema);
  module.exports = User;