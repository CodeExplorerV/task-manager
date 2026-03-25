import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Todo"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const t = await API.get("/tasks");
    const a = await API.get("/tasks/analytics");

    setTasks(t.data);
    setAnalytics(a.data);
  };

  const handleCreate = async () => {
    await API.post("/tasks", form);
    fetchData(); // refresh
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchData();
  };

  const handleStatusChange = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchData();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Analytics */}
      <h3>Analytics</h3>
      <p>Total: {analytics.total}</p>
      <p>Completed: {analytics.completed}</p>
      <p>Pending: {analytics.pending}</p>

      {/* Create Task */}
      <h3>Create Task</h3>
      <input placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })} />
      
      <input placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })} />
      
      <select onChange={(e) => setForm({ ...form, priority: e.target.value })}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={handleCreate}>Add Task</button>

      {/* Tasks */}
      <h3>Tasks</h3>
      {tasks.map((task) => (
        <div key={task._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <button onClick={() => handleStatusChange(task._id, "Done")}>
            Mark Done
          </button>

          <button onClick={() => handleDelete(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;