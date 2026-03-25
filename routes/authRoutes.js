import express from "express";
import User from "../models/User.js"; // ✅ IMPORTANT
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔐 LOGIN (ADMIN ONLY)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // 🔥 password logic
    const firstThree = email.toLowerCase().substring(0, 3);
    const expectedPassword = firstThree + "123";

    if (password !== expectedPassword) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // 🔥 admin check
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Not admin" });
    }

    // 🔐 token generate
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;