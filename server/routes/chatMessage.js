import express from "express";

import {
    createMessage,
    getMessages,
    markMessagesAsRead,
    getUnreadCounts,
} from "../controllers/chatMessage.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatRoomId", getMessages);
router.put("/read/:chatRoomId", markMessagesAsRead);
router.get("/unread/:userId", getUnreadCounts);

export default router;
