const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')
const auth = require('../auth');


//Checking Email
router.post('/checkEmail', userController.checkEmailExists);

// Registration
router.post('/register', userController.registerUser);

//Login
router.post('/login', userController.loginUser);

// Retrieve specific details
router.post("/details", userController.getProfile);


module.exports = router;