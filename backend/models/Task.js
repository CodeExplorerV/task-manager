const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"],
    default: "Todo"
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"]
  },
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);