const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
