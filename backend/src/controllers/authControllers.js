const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/jwt");

const signUp = async (req, res) => {
    var {
        username, email, password
    } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res, next) => {
    try {
        const { email, password, keepMe } = req.body;    
        var user = await userModel.findOne({ email }).exec();       
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid credentials", error_type: "EMAIL" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Invalid credentials", error_type: "PASSWORD" });
        }
        user = {
            name: user.username,
            id:user._id.toHexString()
        };
        const token = await createJWT(user, keepMe);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 350000000,
            path: "/",
            domain: "localhost",
            sameSite: "None",
        });
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
};







module.exports = {
    login,
    signUp
};
