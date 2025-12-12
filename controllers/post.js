const postDB = require('../models/post');
const userDB = require("../models/user");
const response = require('../middlewares/response')

const createPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, description } = req.body;
        if (!userId || userId === ":userId") {
            return response.validationError(res, "Can not create post without userId");
        };
        const findUser = userDB.findOne({ _id: userId });
        if (!findUser) {
            return response.notFoundError(res, "user does not exist");
        } 
        const newPost = await postDB({
          postName: name,
          postDescription: description,
          userDetails: userId,
        }).save();
        console.log(newPost);
        if (!newPost) {
            return response.errorResponse(res, "Failed to create post");
        }
        // findUser.posts.push(newPost._id);
        // findUser.save();
        response.successResponse(res, newPost, "Successfully created the post"); 
    } catch (error) {
        console.log(error);
        response.internalServerError(res, "Internal Server Error");
    }
   
};
const getAllPosts = async (req, res) => {
    try {
        const allPosts = await postDB.find({}).populate({
          path: "comments.commentedBy",
          select: "name",
        });
        response.successResponse(res, allPosts, "Fetched")
    } catch (error) {
        console.log(error);
        response.internalServerError(res, "Internal Server Error");
    }
};
const getSinglePosts = async (req, res) => {
    try {
        const { postId } = req.params;
        const singlePost = await postDB.findOne({ _id: postId }).populate({
            path: "comments.commentedBy",
            select:"name"
        });
        response.successResponse(res, singlePost, "Fetched single post")
    } catch (error) {
        console.log(error);
        response.internalServerError(res, "Internal Server Error");
    }
};
module.exports = { createPost, getAllPosts, getSinglePosts };