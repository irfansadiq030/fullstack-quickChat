const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      require: true,
      type: String,
    },
    lastname: {
      require: true,
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePic: {
      type: String,
      default: null,
      require: false,
    },
  },
  { timestamps: true }
);

//** Export the User model
const User = mongoose.model("users", userSchema);
module.exports = User;
