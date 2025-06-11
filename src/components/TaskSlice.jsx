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
  },
});

export const { addTask, toggleComplete, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
