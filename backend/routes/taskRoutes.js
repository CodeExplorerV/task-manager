const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/taskController");

const auth = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
router.post("/", auth, createTask);
router.get("/analytics", auth, getAnalytics);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;