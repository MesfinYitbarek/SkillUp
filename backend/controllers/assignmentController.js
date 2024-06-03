import Assignment from "../models/Assignment.js";


export const create = async (req, res) => {
  try {
    const { lessonId, assignmentTitle, description, dueDate } = req.body;
    const newAssignment = new Assignment({
      lessonId,
      assignmentTitle,
      description,
      dueDate,
    });
    await newAssignment.save();
    res.status(201).json({ message: "Assignment created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const assignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.find();
    res.json(assignment);
  } catch (error) {
    next(error);
  }
};
export const getassignmentByLessonId = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const assignment = await Assignment.findOne({ lessonId });
    if (!assignment) {
      return res.status(404).json({ message: 'assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment', error });
  }
};