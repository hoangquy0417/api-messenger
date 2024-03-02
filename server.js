import express from 'express';
import dotenv from 'dotenv';
import AuthRouter from './routes/Auth.Router.js';
dotenv.config();

const PORT = process.env.PORT;
const app = express();


app.get('/', (req, res) => {
    //root route 
    res.send("hello world");
})

app.use('/api/auth',AuthRouter);

app.listen(PORT, ()=> {
    console.log("Server is running on ",PORT);
});