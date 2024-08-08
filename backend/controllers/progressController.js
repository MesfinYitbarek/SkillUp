import Progress from '../models/Progress.js';


export const getProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    let progress = await Progress.findOne({ userId, courseId });
    
    if (!progress) {
      progress = { lessons: {} };
    }
    
    res.json(progress.lessons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { userId, courseId, lessonId } = req.params;
    const { type, value } = req.body;

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({ userId, courseId, lessons: {} });
    }

    if (!progress.lessons.get(lessonId)) {
      progress.lessons.set(lessonId, {});
    }

    progress.lessons.get(lessonId)[type] = value;

    await progress.save();

    res.json(progress.lessons.get(lessonId));
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
};