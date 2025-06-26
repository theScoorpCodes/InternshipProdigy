const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6+ chars").isLength({ min: 6 }),
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Valid email required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

module.exports = router;
