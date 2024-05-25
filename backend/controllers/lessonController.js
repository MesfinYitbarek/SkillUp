import Lesson from '../models/Lesson.js';

// Create a new lesson
export const createLesson = async (req, res) => {
  try {
    const { title, description, course, content, videoUrl } = req.body;

    const newLesson = new Lesson({
      title,
      description,
      course,
      content,
      videoUrl,
    });

    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get a lesson by ID
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.find({ course: req.params.courseId })
    res.status(200).json(lesson);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getLessonBylessonId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const lessonId = req.params.lessonId;
    const lesson = await Lesson.findOne({ _id: lessonId, courseId });
    if (!lesson) {
      return res.status(404).send('Lesson not found');
    }
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Update a lesson
export const updateLesson = async (req, res) => {
  try {
    const { title, description, content, videoUrl } = req.body;

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.lessonId,
      { title, description, content, videoUrl },
      { new: true } // Return the updated document
    );

    res.status(200).json(lesson);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete a lesson
export const deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.lessonId);
    res.status(200).json({ msg: 'Lesson deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};