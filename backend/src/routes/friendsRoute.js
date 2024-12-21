const express = require("express");
const {
  sendFriendRequest,
  respondToFriendRequest,
  getFriendsPosts,
} = require("../controllers/friendControllers");

const {authMiddleware} = require('../middlewares/authMiddleware')

const router = express.Router();

router.post("/:userId/friend-request",authMiddleware(), sendFriendRequest);

router.post("/friend-request/respond",authMiddleware(), respondToFriendRequest);

router.get("/:userId/friends/posts",authMiddleware(), getFriendsPosts);

module.exports = router;
