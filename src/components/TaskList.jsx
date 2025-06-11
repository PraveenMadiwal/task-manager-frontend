import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTask } from './TaskSlice';

export default function TaskList() {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-2">Task List</h2>
      {tasks.map(task => (
        <div
          key={task.id}
          className={`p-4 rounded shadow border flex justify-between items-start ${
            task.completed ? 'bg-green-100' : 'bg-yellow-100'
          }`}
        >
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(toggleComplete(task.id))}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
