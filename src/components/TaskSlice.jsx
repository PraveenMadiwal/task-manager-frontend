import { createSlice, nanoid } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      });
    },
    toggleComplete: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    // ✅ New editTask reducer
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.find(task => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
  },
});

// ✅ Export the new action
export const { addTask, toggleComplete, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
