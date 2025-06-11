// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-start justify-between bg-white p-4 rounded shadow hover:shadow-lg"
            >
              <div className="flex-grow">
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </h3>
                <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onToggle(task.id)}
                  className={`px-3 py-1 text-sm rounded ${
                    task.completed ? 'bg-yellow-400' : 'bg-green-500'
                  } text-white hover:opacity-90`}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
