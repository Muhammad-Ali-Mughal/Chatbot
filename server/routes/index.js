import { Router } from "express";
import userRouter from "./user-routes.js";
import chatRouter from "./chat-routes.js";

const router = Router();

router.use("/user", userRouter); //domain/api/v1/user
router.use("/chat", chatRouter); //domain/api/v1/chat

export default router;
