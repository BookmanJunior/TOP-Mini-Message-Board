const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const { format } = require("date-fns");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: User, required: true },
  date: { type: Date, required: true },
});

commentSchema.virtual("sorted_date").get(function () {
  return format(this.date, "MMM do, h:m:a");
});

module.exports = mongoose.model("Comment", commentSchema);
