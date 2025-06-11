import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
