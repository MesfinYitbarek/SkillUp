import express from 'express';
import { createAssignment, getAssignments, getAssignmentById, updateAssignment, deleteAssignment, upload } from '../controllers/assignmentController.js';

const router = express.Router();

router.post('/', upload, createAssignment);
router.get('/', getAssignments);
router.get('/:id', getAssignmentById);
router.put('/:id', upload, updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
