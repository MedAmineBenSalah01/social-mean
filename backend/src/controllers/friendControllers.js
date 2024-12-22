const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const sendFriendRequest = async (req, res, next) => {
  try {
    const { userId } = req.params; 
    const senderId = req.body.id; 

    if (userId === senderId) {
      return res.status(400).json({ success: false, message: "You cannot send a friend request to yourself." });
    }

    const targetUser = await userModel.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (targetUser.friendRequests.some((req) => req.sender.toString() === senderId)) {
      return res.status(400).json({ success: false, message: "Friend request already sent." });
    }

    targetUser.friendRequests.push({ sender: senderId });
    await targetUser.save();

    res.status(200).json({ success: true, message: "Friend request sent successfully." });
  } catch (error) {
    next(error);
  }
};

const respondToFriendRequest = async (req, res, next) => {
  try {
    const { requestId, status } = req.body; 
    const user = await userModel.findById(req.body.id);
    const requestIndex = user.friendRequests.findIndex((req) => req._id.toString() === requestId);
    console.log('=requestIndex',requestIndex)
    if (requestIndex === -1) {
      return res.status(404).json({ success: false, message: "Friend request not found." });
    }
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }
    const friendRequest = user.friendRequests[requestIndex];
    if (status === "accepted") {
      user.friends.push(friendRequest.sender);
      const sender = await userModel.findById(friendRequest.sender);
      sender.friends.push(user._id);
      await sender.save();
    }
    user.friendRequests.splice(requestIndex, 1);
    await user.save();

    res.status(200).json({ success: true, message: `Friend request ${status}.` });
  } catch (error) {
    next(error);
  }
};

const getFriendsPosts = async (req, res, next) => {
  try {
    const { userId } = req.params; 
    const user = await userModel.findById(userId).populate("friends");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    const friendsPosts = await postModel.find({ author: { $in: user.friends } })
      .populate("author", "username email")
      .populate("comments.author", "username email")
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({ success: true, posts: friendsPosts });
  } catch (error) {
    next(error);
  }
};


const searchFriends = async (req,res,next) => {
  try {
    const username = req.body.username;
    const searchResult = await userModel.findOne({
      username:username
    });
    
    if(!searchResult) {
      res.status(404).send({
        error:"User is not found."
      })
    }
    res.status(200).json({
      searchResult
    })
  }
  catch(error) {
    next(error);
  }
}


module.exports = {
    getFriendsPosts,
    sendFriendRequest,
    respondToFriendRequest,
    searchFriends
}