import {createSlice} from '@reduxjs/toolkit';
import {act} from 'react';
import {v4 as uuidv4} from 'uuid';

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
};

const tasksSlice = createSlice({
  initialState,
  name: 'taskManeger',
  reducers: {
    createNewTask: (state, {payload}) => {
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
});

const {reducer, actions} = tasksSlice;
export const {checkTask, createNewTask, removeTask, setFilter} = actions;
export default reducer;
