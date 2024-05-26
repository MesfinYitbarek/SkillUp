import Assignment from '../models/Assignment.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// To resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
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

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { title, description } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (req.file) {
      if (assignment.filePath) {
        fs.unlinkSync(assignment.filePath); // Delete the old file
      }
      assignment.filePath = req.file.path; // Update with new file path
    }

    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;

    await assignment.save();

    res.status(200).json({ message: 'Assignment updated successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (assignment.filePath) {
      fs.unlinkSync(assignment.filePath); // Delete the file
    }

    await assignment.remove();

    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { createAssignment, getAssignments, getAssignmentById, updateAssignment, deleteAssignment, upload };
