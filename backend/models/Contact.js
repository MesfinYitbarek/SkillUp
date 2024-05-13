import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email for each submission
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Add timestamps for creation/update tracking

const Contact= mongoose.model('Contact', ContactSchema);
export default Contact
