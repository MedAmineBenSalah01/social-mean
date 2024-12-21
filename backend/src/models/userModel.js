const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
    friendRequests: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
      },
    ],
});


module.exports = mongoose.model('userModel', userModel);
