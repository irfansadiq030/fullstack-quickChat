const jwt = require("jsonwebtoken");

// Middleware for authenticating requests
const authMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No token provided.",
      success: false,
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = decoded; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Invalid Token: ", error);
    res.status(403).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};

module.exports = authMiddleware;
