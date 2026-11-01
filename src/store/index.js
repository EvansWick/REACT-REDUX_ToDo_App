import {configureStore} from '@reduxjs/toolkit';
import TasksReduser from './TaskManegerSlice';

export default configureStore({reducer: {TasksManeger: TasksReduser}});
