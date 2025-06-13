import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTask, editTask } from './TaskSlice';
import {
  getTasks,
  createTask,
  editTask,
  deleteTask,
  toggleCompleteLocal
} from '../components/TaskSliceBackend';

export default function TaskList() {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleEditSave = () => {
    dispatch(editTask({ id: editingId, title: editTitle, description: editDescription }));
    setEditingId(null);
  };

  return (
    <div className="space-y-4 mt-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Task List</h2>
      {tasks.map(task => (
        <div
          key={task.id}
          className={`p-4 rounded shadow border flex justify-between items-center ${
            task.completed ? 'bg-green-100' : 'bg-yellow-100'
          }`}
        >
          <div className="flex-1 mr-4">
            {editingId === task.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p>{task.description}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <button
              onClick={() => dispatch(toggleComplete(task.id))}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
                          {/* <button
                onClick={() => {
                  dispatch(toggleCompleteLocal(task.id));
                  dispatch(editTask({ id: task.id, title: task.title, description: task.description, completed: !task.completed }));
                }}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button> */}

            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Delete
            </button>

           { /*  Show Edit/Done only if task is NOT completed */}
            {!task.completed && (
              editingId === task.id ? (
                <button
                  onClick={handleEditSave}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Done
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(task)}
                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  Edit
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
