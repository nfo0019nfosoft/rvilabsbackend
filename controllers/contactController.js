import Contact from "../models/Contact.js";
import { connectDB } from "../lib/mongodb.js";

// GET contacts
export const getContacts = async (req, res) => {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

// POST contact (ADD THIS 🔥)
export const createContact = async (req, res) => {
  try {
    await connectDB();

    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving contact" });
  }
};