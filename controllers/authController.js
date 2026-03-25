import jwt from "jsonwebtoken";
import User from "../models/User.js";

// LOGIN (ADMIN ONLY)
export const loginAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 🔥 FIX: trim spaces
    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const firstThree = email.substring(0, 3);
    const expectedPassword = firstThree + "123";

    console.log("EXPECTED:", expectedPassword);
    console.log("ENTERED:", password);

    if (password !== expectedPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Not admin" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};