import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './Models/User.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
//set up config env access env
dotenv.config();
const mongoUrl = process.env.mongoUrl;
// connect database
mongoose.connect(mongoUrl);
// get secret key
const jwtSecret = process.env.JWT_SECRET;
// get client URL
const client = process.env.CLIENT_URL;

const app = express();
app.use(cors({
    credentials: true,
    origin: client
}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json("test ok");
})

app.post('/register', async (req, res) => {
    console.log(req.body);
    let {username,password} = req.body;
    const createdUser = await User.create({username, password});
    jwt.sign({userId: createdUser._id},jwtSecret,{}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).status(201).json(
            {_id: createdUser.id}
        );
    });
})
app.listen(3000, ()=> {
    console.log("Server is running");
});