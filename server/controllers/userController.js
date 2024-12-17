const router = require("express").Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");

// Get details of the current logged in user
router.get("/get-logged-user", authMiddleware, async (req, res) => {
  const { user } = req.body;

  try {
    const userData = await User.findOne({ _id: user.id });

    res.status(200).send({
      message: "User Fetched Successfully",
      success: true,
      user: userData,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// Get all users except the currently logged-in user
router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    // Fetch all users except the currently logged-in user
    const users = await User.find({ _id: { $ne: req.body.userId } }).select(
      "-password"
    ); // Exclude password field

    res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

module.exports = router;
