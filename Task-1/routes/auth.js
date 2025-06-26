const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route
router.get("/protected", authMiddleware, (req, res) => {
  console.log(req.user);
  
  res.json({
    message: `Hello, user ${req.user.id}. This is a protected route.`,
  });
});

module.exports = router;
