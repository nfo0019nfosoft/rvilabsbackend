import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// ✅ POST (already working)
router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json(newContact);
  } catch (err) {
    console.log("POST ERROR 👉", err);
    res.status(500).json({ error: "Failed ❌" });
  }
});

// ✅ GET (🔥 FIXED)
router.get("/contact", async (req, res) => {
  try {
    console.log("GET CONTACT HIT"); // debug

    const contacts = await Contact.find().sort({ createdAt: -1 });

    console.log("DATA 👉", contacts); // debug

    res.status(200).json(contacts);
  } catch (err) {
    console.log("GET ERROR 👉", err); // 🔥 VERY IMPORTANT
    res.status(500).json({ error: "Failed ❌" });
  }
});

// ✅ DELETE contact
router.delete("/contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed ❌" });
  }
});

export default router;