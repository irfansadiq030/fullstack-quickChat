const express = require("express");
const Chat = require("../models/chat"); // Chat Model
const User = require("../models/user"); // User Model
const Message = require("../models/message"); // Message Model
const authMiddleware = require("../middlewares/authMiddleware"); // Authentication Middleware

const router = express.Router();

router.post("/new-message", authMiddleware, async (req, res) => {
  try {
    // 1. Store the message in Message table/Collection.
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    // 2. Update the lastMessage in chat collection.
    // const currentChat = await Chat.findById(req.body.chatId);
    // currentChat.lastMessage = savedMessage._id;
    // await currentChat.save();

    // Another way:
    const currentChat = await Chat.findOneAndUpdate(
      {
        _id: req.body.chatId,
      },
      {
        lastMessage: savedMessage._id,
        $inc: { unreadMessageCount: 1 },
      }
    );

    res.status(201).send({
      success: true,
      message: "Message sent successfully!",
      data: savedMessage,
    });
  } catch (error) {
    console.log("Error in new-message api: ", error.Message);
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get all messages
router.get("/get-all-messages/:chatId", authMiddleware, async (req, res) => {
  try {
    const allChats = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });

    res.status(200).send({
      message: "Messages Fetched Successfully",
      success: true,
      data: allChats,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
