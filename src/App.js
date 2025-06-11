import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = "http://localhost:8080/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("ALL");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const filterTasks = async (type) => {
    setFilter(type);
    if (type === "ALL") return fetchTasks();
    const completed = type === "COMPLETED";
    try {
      const res = await axios.get(`${API}/filter?completed=${completed}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error filtering tasks:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    await axios.post(API, { ...formData, completed: false });
    setFormData({ title: "", description: "" });
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`${API}/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">📝 Task Manager</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Task</button>
      </form>

      <div className="my-4 space-x-2">
        <button onClick={() => filterTasks("ALL")} className="px-3 py-1 border">All</button>
        <button onClick={() => filterTasks("COMPLETED")} className="px-3 py-1 border">Completed</button>
        <button onClick={() => filterTasks("PENDING")} className="px-3 py-1 border">Pending</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 mb-2 flex justify-between items-center">
            <div>
              <h2 className={`font-semibold ${task.completed ? "line-through text-green-600" : ""}`}>
                {task.title}
              </h2>
              <p>{task.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => toggleTask(task)} className="text-yellow-600 text-sm">Toggle</button>
              <button onClick={() => deleteTask(task.id)} className="text-red-600 text-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
