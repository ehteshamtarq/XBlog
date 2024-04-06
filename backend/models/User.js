const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  blogs:[{type:Schema.type.ObjectId, ref: "Blog"}],
  comments:[{type:Schema.type.ObjectId, ref: "Comment"}]

});

export default  model("User", userSchema)
