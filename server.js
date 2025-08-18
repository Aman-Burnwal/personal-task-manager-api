import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import userRouter from './routers/User.js'

dotenv.config();
const app = express();

app.use(json());
app.use("/api/v1", userRouter)
const PORT = process.env.PORT || 3000;


const serverStart = async () => {
   await connectDB();
   app.listen(PORT, () => {
     console.log('Server running on PORT %d', PORT);
   });
}

serverStart();
