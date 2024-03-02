import express from 'express';
import dotenv from 'dotenv';

import AuthRouter from './routes/Auth.Router.js';
import connectToMongoDB from './db/ConnectToMongoDB.js'

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// to parse the incoming reqyests with json payload (from req.body)
app.use(express.json());
// app.get('/', (req, res) => {
//     //root route 
//     res.send("hello world");
// })

app.use('/api/auth',AuthRouter);

app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log("Server is running on ",PORT);
});