import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  filePath: String,
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
