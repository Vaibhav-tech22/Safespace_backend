const User = require('../models/userModel');

const ErrorHandler = require('../utils/errorHandler');

exports.registerUser = async (req, res, next) => {
    const {name, email, phoneNumber, password} = req.body;
    const user = await User.create({
        name,
        email,
        phoneNumber,
        password
    });
    res.status(201).json({
        success: true,
        user
    });
}


exports.loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    //Check if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400));
    }
    //Finding user in database
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
}

exports.getUsers = async (req, res, next) => {
    res.status(200).json({message:"The user route works fine!"});
}