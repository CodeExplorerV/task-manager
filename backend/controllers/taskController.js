const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET TASKS (with filter + search)
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    let filter = { userId: req.user.id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(filter);

    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getAnalytics = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Done").length;
    const pending = total - completed;

    const percentage = total === 0 ? 0 : ((completed / total) * 100).toFixed(2);

    res.json({
      total,
      completed,
      pending,
      completionPercentage: percentage
    });
  } catch (err) {
    res.status(500).json(err);
  }
};