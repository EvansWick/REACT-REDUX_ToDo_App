import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {act} from 'react';
import {v4 as uuidv4} from 'uuid';
import {axiosInstanceTasks} from '../api';

const initialState = {
  tasks: [
    {
      id: uuidv4(),
      isDone: true,
      name: 'Вивчити концепцію HOC',
    },
    {
      id: uuidv4(),
      isDone: false,
      name: 'Налаштувати Redux Toolkit',
    },
    {
      id: uuidv4(),
      isDone: false,
      name: 'Реалізувати фільтрацію тасків',
    },
    {
      id: uuidv4(),
      isDone: true,
      name: 'Налаштувати лінтер StandardJS',
    },
    {
      id: uuidv4(),
      isDone: false,
      name: 'Стилізувати інтерфейс',
    },
  ],
  filter: 'all',
  isFetching: false,
  error: null,
};

export const tasksThunk = createAsyncThunk(
  'tasks/getTasks',
  async (_, thunkAPI) => {
    try {
      const {data} = await axiosInstanceTasks.get('/todos', {
        params: {
          _limit: 5,
          page: 1,
        },
      });
      // console.log('data :>> ', data);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const tasksSlice = createSlice({
  initialState,
  name: 'taskManeger',
  reducers: {
    createNewTask: (state, {payload}) => {
      // console.log('add new task');
      state.tasks.push({id: uuidv4(), isDone: false, name: payload});
    },
    checkTask: (state, {payload: {id, ...taskSettings}}) => {
      const taskIndex = state.tasks.findIndex(t => t.id === id);
      if (taskIndex === -1) return;
      state.tasks[taskIndex] = {...state.tasks[taskIndex], ...taskSettings};
    },
    removeTask: (state, {payload: id}) => {
      state.tasks = state.tasks.filter(t => t.id !== id);
    },
    setFilter: (state, {payload}) => {
      state.filter = payload;
      // console.log(payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(tasksThunk.pending, (state, {payload}) => {
      console.log('tasks are loading');

      state.isFetching = true;
    });
    builder.addCase(tasksThunk.fulfilled, (state, {payload}) => {
      state.isFetching = false;
      console.log('tasks loaded');
      // Промапити дату в стан
      state.tasks = payload.map(t => ({
        id: uuidv4(),
        isDone: t.completed,
        name: t.title,
        userId: t.userId,
      }));
    });
    builder.addCase(tasksThunk.rejected, (state, {payload}) => {
      state.isFetching = false;
      state.error = payload;
      console.log('Fail load tasks', payload);
    });
  },
});

const {reducer, actions} = tasksSlice;
export const {checkTask, createNewTask, removeTask, setFilter} = actions;
export default reducer;
