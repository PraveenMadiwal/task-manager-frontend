import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { fetchTasks, addTask, updateTask, deleteTask as deleteTaskAPI } from '../../api/api';

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  const response = await fetchTasks();
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const response = await addTask(task);
  return response.data;
});

export const editTask = createAsyncThunk('tasks/editTask', async ({ id, title, description, completed }) => {
  const response = await updateTask(id, { title, description, completed });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await deleteTaskAPI(id);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    toggleCompleteLocal: (state, action) => {
      const task = state.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter(task => task.id !== action.payload);
      });
  },
});

export const { toggleCompleteLocal } = taskSlice.actions;
export default taskSlice.reducer;
