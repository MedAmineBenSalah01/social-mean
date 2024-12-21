const express = require('express');
const { createPost,likePost,commentOnPost,getUserPosts,getPostsForFriends } = require('../controllers/postControllers');
const {authMiddleware} = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/create-post',authMiddleware(), createPost);
router.post('/:postId/like',authMiddleware(), likePost);
router.post('/:postId/comment',authMiddleware(), commentOnPost);
router.get('/me/posts',authMiddleware(), getUserPosts);
router.get('/friends/posts',authMiddleware(), getPostsForFriends);


module.exports = router;
