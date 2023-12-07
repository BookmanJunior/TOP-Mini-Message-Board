const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../model/comment");
const User = require("../model/user");

// Get comments
exports.get_comments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({})
    .sort({ date: 1 })
    .populate("user")
    .exec();

  res.render("index", {
    title: "Mini Messageboard",
    comments,
  });
});

// Post comment
exports.post_comment = [
  body("username", "Username can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("userMessage", "Comment can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    const new_user = new User({ name: req.body.username });

    const comments = {
      comment: req.body.userMessage,
      user: new_user,
      date: new Date(),
    };

    // check for error
    if (!error.isEmpty()) {
      //error. resend form

      res.render("form", {
        title: "Mini Messageboard",
        comments,
        errors: error.array(),
      });
    } else {
      await Promise.all([new Comment(comments).save(), new_user.save()]);
      res.redirect("/");
    }
  }),
];
