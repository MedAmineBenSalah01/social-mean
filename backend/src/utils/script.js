const mongoose = require("mongoose");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");

const createUsersAndPosts = async () => {
    const salt = await bcrypt.genSalt(10);
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
        await mongoose.connect("mongodb://localhost:27017/mini-social-app", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Check if users already exist before creating them
        const user1Exists = await User.findOne({ username: "User1" });
        const user2Exists = await User.findOne({ username: "User2" });

        let user1, user2;
        if (!user1Exists) {
            user1 = new User({
                username: "User1",
                email: "user1@example.com",
                password: hashedPassword,
            });
            await user1.save();
        } else {
            console.log("User1 already exists");
            user1 = user1Exists;
        }

        if (!user2Exists) {
            user2 = new User({
                username: "User2",
                email: "user2@example.com",
                password: hashedPassword,
            });
            await user2.save();
        } else {
            console.log("User2 already exists");
            user2 = user2Exists;
        }

        // Check if posts already exist before creating them
        const post1Exists = await Post.findOne({ text: "Post 1 from User1", author: user1._id });
        const post2Exists = await Post.findOne({ text: "Post 2 from User1", author: user1._id });
        const post3Exists = await Post.findOne({ text: "Post 1 from User2", author: user2._id });
        const post4Exists = await Post.findOne({ text: "Post 2 from User2", author: user2._id });

        if (!post1Exists) {
            const post1 = new Post({
                text: "Post 1 from User1",
                author: user1._id,
            });
            await post1.save();
        } else {
            console.log("Post 1 from User1 already exists");
        }

        if (!post2Exists) {
            const post2 = new Post({
                text: "Post 2 from User1",
                author: user1._id,
            });
            await post2.save();
        } else {
            console.log("Post 2 from User1 already exists");
        }

        if (!post3Exists) {
            const post3 = new Post({
                text: "Post 1 from User2",
                author: user2._id,
            });
            await post3.save();
        } else {
            console.log("Post 1 from User2 already exists");
        }

        if (!post4Exists) {
            const post4 = new Post({
                text: "Post 2 from User2",
                author: user2._id,
            });
            await post4.save();
        } else {
            console.log("Post 2 from User2 already exists");
        }

        console.log("Users and posts created successfully!");
    } catch (error) {
        console.error("Error creating users and posts:", error);
    }
};

module.exports = createUsersAndPosts;
