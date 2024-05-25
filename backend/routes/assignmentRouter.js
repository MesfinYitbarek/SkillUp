import express from 'express';
import { createAssignment, upload } from '../controllers/assignmentController.js';

const router = express.Router();

router.post('/', upload, createAssignment);

export default router;
