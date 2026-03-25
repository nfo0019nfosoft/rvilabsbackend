import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
const allowedOrigins = [
  "http://localhost:3000",
  "https://rvilabs.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 🔥 ADD THIS

// 🔥 Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", contactRoutes);
app.use("/api", careerRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ❌ Error handler (last)
app.use((err, req, res, next) => {
  console.error("ERROR 👉", err.stack);
  res.status(500).json({
    error: err.message || "Something went wrong",
  });
});

// ✅ DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB Error:", err);
  });