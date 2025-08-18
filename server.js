import express, { json } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(json());
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {console.log("Server running on PORT %d", PORT)})