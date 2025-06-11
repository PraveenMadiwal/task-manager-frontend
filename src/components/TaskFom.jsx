import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './TaskSlice';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    dispatch(addTask({ title, description }));
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Add Task</h2>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
