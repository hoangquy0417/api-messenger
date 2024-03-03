import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if (password !== confirmPassword) {
           return res.status(400).json({Error: "Password don't match"});
        }
    
        const user = await User.findOne({username});
    
        if (user) {
           return res.status(400).json({Error: "username is already exists"});
        }
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //api generate image https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        if (newUser) {
            // generate jwt token here
            generateTokenAndSetCookie(newUser.id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.username,
                profilePic: newUser.profilePic
            })
        }
        else {
            return res.status(400).json({Error: "Invalid user data"});
        }
        
        
    } catch (error) {
        console.log("Error in sigup Auth.Controller", error.message);
        res.status(500).json({Error:"Internal Server Error"});
    }
}
    

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect) {
           return res.status(400).json({Error: "Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
    } catch (error) {
        console.log("Error in login Auth.Controller", error.message);
        res.status(500).json({Error:"Internal Server Error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt","", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in login Auth.Controller", error.message);
        res.status(500).json({Error:"Internal Server Error"});
    }
}