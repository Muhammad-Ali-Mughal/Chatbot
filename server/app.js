import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

config();

const app = express();

app.use(express.json()); // tells the application that the data we'll be getting or sending, through GET/POST requests, will always be in JSON format.

app.use(morgan("dev")); // we'll remove it after development
app.use(cookieParser(process.env.COOKIE_SECRET)); // used for passing cookies from back-end to front-end

app.use("/api/v1", router);

export default app;
