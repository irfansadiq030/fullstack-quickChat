const express = require("express");
const Chat = require("../models/chat"); // Chat Model
const User = require("../models/user"); // User Model
const authMiddleware = require("../middlewares/authMiddleware"); // Authentication Middleware

const router = express.Router();

// ** Send a message
router.post("/create-new-chat", authMiddleware, async (req, res) => {
  try {
    // Create a new message
    const chatMessage = new Chat(req.body);

    // Save the message to the database
    const savedChat = await chatMessage.save();

    res.status(201).json({
      message: "Chat Created Successfully!",
      success: true,
      data: savedChat,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      message: "Failed to send message",
      success: false,
      error: error.message,
    });
  }
});

// ** Get All chats
router.get("/get-all-chats", authMiddleware, async (req, res) => {
  const { user } = req.body;

  try {
    // Fetching chats
    const allChats = await Chat.find({ members: { $in: user.id } });

    res.status(200).json({
      message: "Chats Fetched Successfully!",
      success: true,
      data: allChats,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      message: "Failed to send message",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
