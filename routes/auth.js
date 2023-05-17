const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user
    const user = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login request received:", username, password);

    // Find the user by their username
    const user = await User.findOne({ username });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
