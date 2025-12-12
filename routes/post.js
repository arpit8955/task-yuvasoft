const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePosts,
} = require("../controllers/post");
const isAuthorized = require("../middlewares/auth");
const router = express.Router();

router.post("/create/:userId",isAuthorized, createPost);
router.get("/getall", getAllPosts);
router.get("/getsinglepost/:postId", getSinglePosts);

module.exports = router;
