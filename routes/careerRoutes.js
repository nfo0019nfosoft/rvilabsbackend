import express from "express";
import multer from "multer";
import { submitApplication, getAllApplications } from "../controllers/careerController.js";

const router = express.Router(); // ✅ FIRST define router

// 📁 Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// 🔒 File filter (only PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/DOC/DOCX files allowed"), false);
  }
};

// ⚠️ Limits (max 5MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ✅ Routes
router.post("/careers", upload.single("resume"), submitApplication);
router.get("/careers", getAllApplications);

export default router;