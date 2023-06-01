const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists or email mamnu3
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This username already exists" });
    } else if (existingEmail) {
      return res.status(400).json({ message: "This Email Already Exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Redirect the user to the login page
    res.redirect("/registration");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the entered password matches the stored password
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Redirect the logged-in user to the home page
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
