const express = require('express');
const path = require('path');

const postsController = require('../../controllers/posts');
const authController = require('../../controllers/auth');

const router = express.Router();

router.get('/', authController.requireJWTAuth, postsController.getPostsIndex);

module.exports = router;
