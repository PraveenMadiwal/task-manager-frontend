import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskFom';


function App() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
