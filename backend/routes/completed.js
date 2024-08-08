// routes/completedCourses.js

import express  from  'express';
import { addCompletedCourse, getCompletedCourses } from '../controllers/completedCoursesController.js';


const completedrouter = express.Router();

completedrouter.post('/', addCompletedCourse);
completedrouter.get('/:userId', getCompletedCourses);

export default completedrouter;