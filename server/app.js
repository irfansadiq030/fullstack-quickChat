const express = require("express");
var cors = require("cors");
const app = express();

const authRouter = require("./controllers/authController");
const userRouter = require("./controllers/userController");
const chatRouter = require("./controllers/chatController");
const messageRouter = require("./controllers/messageController");

// ** use AuthController routers
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

module.exports = app;
