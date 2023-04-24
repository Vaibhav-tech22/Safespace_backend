const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const _ = require("lodash");
const axios = require("axios");

const User = require("../models/userModel");
const Otp = require("../models/otpModel");

const ErrorHandler = require("../utils/errorHandler");

exports.registerUser = async (req, res, next) => {
    const {name, email, phoneNumber} = req.body;
    const user = await User.findOne({phoneNumber});
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }
    const tempUser = {name, email, phoneNumber};
    const newUser = await User.create(tempUser);
    const OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    console.log(OTP);
    const otpData = await Otp.create({
        userId: newUser._id,
        otp: OTP,
    });
    const salt = await bcrypt.genSalt(10);
    otpData.otp = await bcrypt.hash(otpData.otp, salt);
    const result = await otpData.save();
    res.status(201).json({
        success: "Otp send successfully",
        newUser,
    });
};

exports.loginUser = async (req, res, next) => {
    const {email, phoneNumber} = req.body;
    //Finding user in database
    const user = await User.findOne({email});
    if (!user) {
        return next(new ErrorHandler("Invalid Email", 401));
    }
    const OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    console.log(OTP);
    const otpData = await Otp.create({userId: user._id, otp: OTP});
    const salt = await bcrypt.genSalt(10);
    otpData.otp = await bcrypt.hash(otpData.otp, salt);
    const result = await otpData.save();
    return res.status(200).json({
        success: true,
        message: "Otp send successfully"
    });
};

exports.loginOtp = async (req, res, next) => {
    const {userId, otp} = req.body;
    const student = await User.findOne({_id: userId});
    if (!student) {
        return res.status(401).json({err:"The user does not exist"});
    }
    const otpData = await Otp.findOne({userId: student._id});
    const isMatch = await bcrypt.compare(otp, otpData.otp);
    if (!isMatch) {
        return res.status(401).json({err:"Invalid Otp"});
    }
    await Otp.findByIdAndDelete(otpData._id);
    const userToken = student.getJWTToken();
    res.status(200).json({
        success:true,
        user:student,
        token:userToken
    });
};




exports.logoutUser = async (res, req, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged out",
    });
};

exports.verifyOtp = async (req, res, next) => {
    const {userId, otp} = req.body;
    const user = await User.findOne({_id: userId, verified: false});
    if (!user) {
        return next(new ErrorHandler("Invalid user", 401));
    }
    const otpData = await Otp.findOne({userId: userId});
    const isMatch = await bcrypt.compare(otp, otpData.otp);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid Otp", 401));
    }
    user.verified = true;
    await user.save();
    await Otp.findByIdAndDelete(otpData._id);
    const userToken = user.getJWTToken();
    res.status(200).json({
        success: true,
        userToken,
        user,
    });
};
