const Post = require('../models/postModel');  
const userModel = require('../models/userModel');

const createPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userId = req.body.user.id;  

    const newPost = new Post({
      text,
      author: userId,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const userId = req.body.id;  
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    const user = await userModel.findById(userId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const commentOnPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userId = req.body.id;  
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      text,
      author: userId,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json({ message: "Comment added successfully", post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUserPosts = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const posts = await Post.find({ author: userId }).populate('author', 'username');
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const getPostsForFriends = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const user = await userModel.findById(userId).populate('friends');
    const posts = await Post.find({
      $or: [
        { author: userId },
        { author: { $in: user.friends } },
      ],
    }).populate('author', 'username');

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


module.exports = { createPost , likePost , commentOnPost,getUserPosts,getPostsForFriends};
