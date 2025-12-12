const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
        postName: {
       type:String
        },
        postDescription: {
          type:String
        },
        userDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        likes: {
            type: Number,
            default:0
        },
        comments: {
            commentedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment: {
                type:String
            }
        }
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
