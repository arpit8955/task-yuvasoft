const express = require('express');
const { createUser, loginUser, likePost,commentPost } = require("../controllers/user");
const isAuthorized = require('../middlewares/auth')
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/likepost/:postId", likePost);
router.post("/commentpost/:postId", commentPost);
module.exports = router;
