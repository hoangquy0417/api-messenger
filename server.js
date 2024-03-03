import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import UserRouter from './routes/User.Router.js'
import AuthRouter from './routes/Auth.Router.js';
import MessageRouter from './routes/Message.Router.js';
import connectToMongoDB from './db/ConnectToMongoDB.js'

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// to parse the incoming reqyests with json payload (from req.body)
app.use(express.json());
// to parse the incoming cookie from req.cookies
app.use(cookieParser());
// app.get('/', (req, res) => {
//     //root route 
//     res.send("hello world");
// })

app.use('/api/auth',AuthRouter);
app.use('/api/message',MessageRouter);
app.use('/api/users',UserRouter);

app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log("Server is running on ",PORT);
});