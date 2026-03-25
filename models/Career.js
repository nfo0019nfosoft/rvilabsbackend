import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    position: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      trim: true,
    },

    resume: {
      type: String, // file name
      required: true,
    },
  },
  {
    timestamps: true, // 🔥 auto adds createdAt & updatedAt
  }
);

export default mongoose.model("Career", careerSchema);