import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './Models/User';
import jwt from 'jsonwebtoken';
//set up config env access env
dotenv.config();
const mongoUrl = process.env.mongoUrl;
// connect database
mongoose.connect(mongoUrl);
const app = express();
// get secret key
const jwtSecret = process.env.JWT_SECRET;



app.get('/', (req, res) => {
    res.json("test ok");
})

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const createdUser = await User.create({username, password});
    jwt.sign({userId: createdUser._id,jwtSecret}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).status(201).json('ok');
    });
})
app.listen(3000, ()=> {
    console.log("Server is running");
});