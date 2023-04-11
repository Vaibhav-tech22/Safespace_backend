const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index:{
            expires: 300
        }   
    }

}, {timestamps: true});

module.exports = mongoose.model('Otp', otpSchema);