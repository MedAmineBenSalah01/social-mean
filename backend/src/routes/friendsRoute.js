const express = require("express");
const {
  sendFriendRequest,
  respondToFriendRequest,
  getFriendsPosts,
  searchFriends
} = require("../controllers/friendControllers");

const {authMiddleware} = require('../middlewares/authMiddleware')

const router = express.Router();

router.post("/:userId/friend-request",authMiddleware(), sendFriendRequest);

router.post("/friend-request/respond",authMiddleware(), respondToFriendRequest);

router.get("/:userId/friends/posts",authMiddleware(), getFriendsPosts);

router.post('/users/search',authMiddleware(),searchFriends)

module.exports = router;
