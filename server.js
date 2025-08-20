import express, {json} from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import userRouter from './routers/Users.js';
import taskRouter from './routers/Tasks.js';
import {errorHandler} from './middleware/errorHandler.js';

dotenv.config();
const app = express();

app.use(json());
app.use(cookieParser());
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const serverStart = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log('Server running on PORT %d', PORT);
  });
};

serverStart();
