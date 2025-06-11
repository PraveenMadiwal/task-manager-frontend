// src/App.js
import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8080/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdd = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleToggle = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updated = { ...task, completed: !task.completed };

    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
      <TaskForm onTaskAdd={handleTaskAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
};

export default App;
