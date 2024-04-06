const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: { type: Schema.type.ObjectId, ref: "User" },
  comments: [{ type: Schema.type.ObjectId, ref: "Comment" }],
});

export default model("Blog", blogSchema);
