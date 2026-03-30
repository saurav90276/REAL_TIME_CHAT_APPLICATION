import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { dbConnection } from './database/db.js';
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import path from "path";

const app = express();
const __dirname = path.resolve();
config({ path: "./config/config.env" });

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://real-time-chat-application-eight-umber.vercel.app"
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./temp/",
    })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

app.get("/", (req, res) => {
    res.send("API is running...");
});

dbConnection();
export default app;


