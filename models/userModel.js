const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter your phone number'],
        trim: true,
        maxLength: [11, 'Your phone number cannot exceed 11 characters']
    },
    verified: {
        type: Boolean,
        default: false,
        required:true
    },
});

console.log("hello", process.env.JWT_EXPIRE)
userSchema.methods.getJWTToken = function () {
    console.log(this._id);
    console.log("hello");
    return jwt.sign({ id: this._id, number:this.phoneNumber }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };


module.exports = mongoose.model('User', userSchema);