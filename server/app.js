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

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: [process.env.FRONTEND_URL],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
        })
    );
}
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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    })
}

dbConnection();
export default app;