// src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onTaskAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      description,
      completed: false,
    };

    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const savedTask = await response.json();
        onTaskAdd(savedTask);
        setTitle('');
        setDescription('');
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        className="w-full mb-3 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        className="w-full mb-3 p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
