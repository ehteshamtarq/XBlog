const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require("graphql");
const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { BlogType, CommentType, UserType } = require("../schema/schema");
const { hashSync, compareSync } = require("bcryptjs");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // get all user
    users: {
      type: GraphQLList(UserType),
      async resolve() {
        return await User.find();
      },
    },
    // get all blogs
    blogs: {
      type: GraphQLList(BlogType),
      async resolve() {
        return await Blog.find();
      },
    },
    // get all comments
    comments: {
      type: GraphQLList(CommentType),
      async resolve() {
        return await Comment.find();
      },
    },
  },
});

const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    //user signup
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password }) {
        let existingUser;
        try {
          existingUser = await User.findOne({ email });
          if (existingUser) return new Error("User Already Exists");
          const encryptedPassword = await hashSync(password);
          const user = new User({ name, email, password: encryptedPassword });
          return await user.save();
        } catch (err) {
          return new Error("User Signup Failed. Try Again");
        }
      },
    },
    //user login
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        let existingUser;
        try {
          existingUser = await User.findOne({ email });
          if (!existingUser) {
            return new Error("No User Registered With This Email");
          }
          const decryptedpPassword = compareSync(
            password,
            existingUser?.password
          );

          if (!decryptedpPassword) return new Error("Incorrect Password");
          return existingUser;
        } catch (err) {
          return new Error(err);
        }
      },
    },
    // create blog
    addBlog: {
      type: BlogType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { title, content, date }) {
        let blog;
        try {
          blog = new Blog({ title, content, date });
          return await blog.save();
        } catch (err) {
          return new Error(err);
        }
      },
    },
    // update Blog
    updateBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id, title, content }) {
        let existingBlog;
        try {
          existingBlog = await Blog.findById(id);
          if (!existingBlog) return new Error("Blog doesnot exist");
          return await Blog.findByIdAndUpdate(
            id,
            {
              title,
              content,
            },
            { new: true }
          );
        } catch (err) {
          return new Error(err);
        }
      },
    },
    // delete Blog
    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let existingBlog;
        try {
          existingBlog = await Blog.findById(id);
          if (!existingBlog) return new Error("No Blog Found");
          return await Blog.findByIdAndRemove(id);
        } catch (err) {
          return new Error(err);
        }
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
