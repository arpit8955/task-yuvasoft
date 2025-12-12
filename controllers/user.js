const express = require("express");
const userDB = require("../models/user");
const postDB = require('../models/post');
const response = require("../middlewares/response");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const createUser = async (req, res) => {
  const { name, email, role, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userDB({
    name,
    password: hashedPassword,
    email: email.toLowerCase(),
    phone,
  }).save();
  console.log(newUser);
  response.successResponse(res, newUser, "Successfully created the User");
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return response.validationError(
      res,
      `Cannot login without ${!email ? "email" : !password ? "password" : ""}`
    );
  }
  const userDetails = await userDB.findOne({ email }).select("password");

  if (!userDetails) {
    return response.notFoundError(res, "Email does not exist");
  }

  const matchedPassword = await bcrypt.compare(password, userDetails.password);

  if (matchedPassword) {
    const token = jwt(userDetails._id);
    const result = { token };
    response.successResponse(res, result, ":Login was successful");
  } else {
    response.errorResponse(res, "Password incorrect", 400);
  }
};
const likePost = async (req, res) => {
    const { postId } = req.params;
    const updatedPost = await postDB.findOneAndUpdate(
        { _id: postId },
        { $inc: { likes: 1 } },
        { new: true }
    );
    response.successResponse(res, updatedPost, "Post liked")
};
const commentPost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.query;
    const { comment } = req.body;

    const postComment = {
      commentedBy: userId,
      comment:comment,
    };
    const postAfterComment = await postDB.findOneAndUpdate(
      { _id: postId },
        { $push: { comments: postComment } },
      {new:true}
    );
    response.successResponse(res,postAfterComment,"success")
}
module.exports = { createUser, loginUser, likePost, commentPost };
