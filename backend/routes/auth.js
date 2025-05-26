const express = require("express");
const router = express.Router();

// this endpoint will receive user data from NextAuth.js
router.post("/user", async (req, res) => {
  try {
    const { email, name, image, googleId } = req.body;

    console.log("Received user data:", { email, name, image, googleId });

    // here need to do:
    // check if user exist in database here
    // create new user if doesnt exist

    res.json({
      success: true,
      message: "User authenticated successfully",
      user: {
        email,
        name,
        image,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
});

// Get user profile
router.get("/profile", (req, res) => {
  // add auth middleware here
  res.json({
    message: "User profile endpoint",
    // return user data from database
  });
});
