const express = require("express");
const { prisma } = require("../lib/prisma");
const { isErrored } = require("stream");
const router = express.Router();

// this endpoint will receive user data from NextAuth.js
router.post("/user", async (req, res) => {
  try {
    const { email, name, image, googleId } = req.body;

    console.log("Received user data:", { email, name, image, googleId });

    // check if user exist in database
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    let user;

    if (existingUser) {
      // user exists, update their info if needed (in case of they changing their email name or profile)
      user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name: name,
          image: image,
          googleId: googleId, // update this if wasn't set before
        },
      });

      console.log("Update existing user:", user);
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          image: image,
          googleId: googleId,
        },
      });

      console.log("Created new user:", user);
    }

    res.json({
      success: true,
      message: existingUser
        ? "User updated successfully"
        : "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
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

// get user profile
router.get("/profile", (req, res) => {
  // add auth middleware here
  res.json({
    message: "User profile endpoint",
    // return user data from database
  });
});

module.exports = router;
