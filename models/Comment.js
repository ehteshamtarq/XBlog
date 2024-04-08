const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  blogs: { type: Schema.Types.ObjectId, ref: "Blog" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports =  model("Comment", commentSchema);
