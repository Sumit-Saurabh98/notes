import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['personal', 'work', 'education'] },
  status: { type: String, default: 'todo', enum: ['todo', 'ongoing', 'completed'] },
}, {timestamps: true});

const Task = mongoose.model("Task", taskSchema);

export default Task;
