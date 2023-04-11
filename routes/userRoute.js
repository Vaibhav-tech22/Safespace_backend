const express = require('express');
const { registerUser, loginUser, verifyOtp} = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/signup/verify').post(verifyOtp);

module.exports = router;