const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../model/comment");

// Get comments
exports.get_comments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({})
    .sort({ date: 1 })
    .populate("user")
    .exec();

  res.render("index", { title: "Mini Messageboard", comments });
});

// Post comment
exports.post_comment = [];
