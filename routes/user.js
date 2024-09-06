const express = require('express');
const userController = require('../controllers/user');
const { verify, verifyAdmin, isLoggedIn } = require('../auth');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;  // Ensure this is exporting the router
