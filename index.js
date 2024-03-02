import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const mongoUrl = process.env.mongoUrl;
// connect database
mongoose.connect(mongoUrl);
const app = express();
app.get('/test', (req, res) => {
    res.json("test ok");
})

app.listen(3000, ()=> {
    console.log("Server is running");
});