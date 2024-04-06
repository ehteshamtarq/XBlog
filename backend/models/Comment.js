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
  blogs: { type: Schema.type.ObjectId, ref: "Blog" },
  user: { type: Schema.type.ObjectId, ref: "User" },
});

export default model("Comment", commentSchema);
