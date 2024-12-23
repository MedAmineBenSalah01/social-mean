const mongoose = require("mongoose");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");

const createUsersAndPosts = async () => {
    const salt = await bcrypt.genSalt(10);
    const password = "password123"
    var hashedPassword = await bcrypt.hash(password, salt);
    try {
        await mongoose.connect("mongodb://localhost:27017/mini-social-app", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const user1 = new User({
            username: "User1",
            email: "user1@example.com",
            password: hashedPassword,
        });

        const user2 = new User({
            username: "User2",
            email: "user2@example.com",
            password: hashedPassword,
        });

        await user1.save();
        await user2.save();

        const post1 = new Post({
            text: "Post 1 from User1",
            author: user1._id,
        });

        const post2 = new Post({
            text: "Post 2 from User1",
            author: user1._id,
        });

        const post3 = new Post({
            text: "Post 1 from User2",
            author: user2._id,
        });

        const post4 = new Post({
            text: "Post 2 from User2",
            author: user2._id,
        });

        await post1.save();
        await post2.save();
        await post3.save();
        await post4.save();

        console.log("Users and posts created successfully!", user1, user2);
    } catch (error) {
        console.error("Error creating users and posts:", error);
    }
};

module.exports = createUsersAndPosts;
