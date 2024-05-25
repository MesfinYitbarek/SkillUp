import Assignment from '../models/Assignment.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// To resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Adjust the path as needed
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('file');

const createAssignment = async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePath = req.file ? req.file.path : null;

    const newAssignment = new Assignment({ title, description, filePath });
    await newAssignment.save();

    res.status(201).json({ message: 'Assignment created successfully', assignment: newAssignment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { createAssignment, upload };
