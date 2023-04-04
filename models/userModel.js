const mongoose = require('mongoose');

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
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        trim: true,
        minLength: [6, 'Your password must be longer than 6 characters']
    }

});

module.exports = mongoose.model('User', userSchema);