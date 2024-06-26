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
const { startSession, startTransaction } = require("mongoose");

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
        user: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { title, content, date, user }) {
        let blog;
        const existingUser = await User.findById(user);
        if (!existingUser) return new Error("User Not Found! Exiting");
        const session = await startSession();
        try {
          session.startTransaction({ session });
          blog = new Blog({ title, content, date });
          existingUser.blogs.push(blog);
          await existingUser.save({ session });
          return await blog.save({ session });
        } catch (err) {
          return new Error(err);
        } finally {
          await session.commitTransaction();
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
        const session = await startSession();
        try {
          session.startTransaction({ session });
          existingBlog = await Blog.findById(id).populate("user");
          const existingUser = existingBlog?.user;
          if (!existingUser) return new Error("No user linked to this blog");
          if (!existingBlog) return new Error("No Blog Found");
          existingUser.blogs.pull(existingBlog);
          await existingUser.save({ session });
          return await existingBlog.deleteOne({ id: existingBlog.id });
        } catch (err) {
          return new Error(err);
        } finally {
          session.commitTransaction();
        }
      },
    },
    // add comment to blog
    addCommentToBlog: {
      type: CommentType,
      args: {
        blog: { type: GraphQLNonNull(GraphQLID) },
        user: { type: GraphQLNonNull(GraphQLID) },
        text: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { user, blog, text, date }) {
        const session = await startSession();
        let comment;
        try {
          session.startTransaction({ session });
          const existingUser = await User.findById(user);
          const existingBlog = await Blog.findById(blog);
          if (!existingBlog || !existingUser) {
            return new Error("User or Blog Does Not Exist");
          }
          comment = new Comment({
            text,
            date,
            blog,
            user,
          });
          existingUser.comments.push(comment);
          existingBlog.comments.push(comment);
          await existingUser.save({ session });
          await existingBlog.sav({ session });
          return await comment.save({ session });
        } catch (err) {
          return new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },
    // delete a comment from blog
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let comment;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          comment = await Comment.findById(id);
          if (!comment) return new Error("Comment not found");
          const existingUser = await User.findById(comment?.user);
          if (!existingUser) return new Error("User Not Found");
          const existingBlog = await Blog.findById(comment?.blog);
          if (!existingBlog) return new Error("Blog Not Found");
          existingUser.comment.pull(comment);
          existingBlog.comment.pull(comment);
          await existingUser.save({ session });
          await existingBlog.save({ session });
          return await comment.deleteOne({ id: comment.id });
        } catch (err) {
          return new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },
  },
});

const schema =  new GraphQLSchema({ query: RootQuery, mutation: mutations });
module.exports = schema
