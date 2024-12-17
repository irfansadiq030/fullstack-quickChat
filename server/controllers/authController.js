const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ** Signup Route
router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password, profilePic } = req.body;

  try {
    //1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ message: "User Already Exists", success: false });
    }

    //2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with default status as "active"
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profilePic: profilePic || null, // Optional profile picture
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: savedUser._id,
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

// ** Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }

    // 2. Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // 3. Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // 4. Respond with user details and token
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePic: user.profilePic,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
