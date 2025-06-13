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
      <h2 className="text-xl flex justify-center left-5 font-bold mt-5 mb-2">Add Task</h2>
      <div className="flex mb-5 rounded-md bg-gray-100 shadow-lg shadow-gray-500/50 w-full">
      <input
        type="text"
        className="border m-5 p-2 w-full mb-2"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border m-5 p-2 w-full mb-2"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      </div>
      <button type="submit" className="bg-blue-500 shadow-lg shadow-blue-500/50 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
