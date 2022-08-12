import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './routes/auth.js';
import privateRoute from './routes/private.js';
import connectDb from './config/db.js';
import ErrorHandler from './middleware/error.js';

dotenv.config({path : "./config.env"});

//connect DB set up
connectDb();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/api/auth", (auth));
app.use("api/private", (privateRoute));
app.use(ErrorHandler);

const server = app.listen(port, () => {
    console.log(`Server Up and Running listening on port : ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log('MongoDb failed to connect...');
    console.log(`${err}`);
    server.close(() => process.exit(1));
})