import { Router } from "express";
import { getChats } from "../controllers/chat-controllers.js";

const chatRouter = Router();

chatRouter.use("/", getChats);

export default chatRouter;
