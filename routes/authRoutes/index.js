const express = require('express');
const path = require('path');

const authController = require('../../controllers/auth');

const router = express.Router();

router.get('/sign-up', authController.getSignUp);
router.post('/sign-up', authController.signUpMiddleware);

router.get('/sign-in', authController.getSignIn);
router.post('/sign-in', authController.loginMiddleware);

module.exports = router;
