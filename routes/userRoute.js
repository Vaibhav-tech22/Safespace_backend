const express = require('express');
const { registerUser, loginUser, verifyOtp, loginOtp} = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/signup/verify').post(verifyOtp);
router.route('/login').post(loginUser);
router.route('/login/verify').post(loginOtp);
module.exports = router;