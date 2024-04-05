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
});

export default model("Comment", commentSchema);
