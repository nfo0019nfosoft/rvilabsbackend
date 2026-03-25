// controllers/careerController.js
import Career from "../models/Career.js"; // ✅ ONLY ONE import

export const getAllApplications = async (req, res) => {
  try {
    const data = await Career.find().sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitApplication = async (req, res) => {
  try {
    const { name, email, phone, position, message } = req.body;

    // 🔒 Resume check
    if (!req.file) {
      return res.status(400).json({
        error: "Resume file is required",
      });
    }

    // ✅ Save to DB
    const newApplication = new Career({
      name,
      email,
      phone,
      position,
      message,
      resume: req.file.filename,
    });

    await newApplication.save();

    console.log("✅ Saved to DB:", newApplication);

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      error: "Failed to submit application",
    });
  }
};