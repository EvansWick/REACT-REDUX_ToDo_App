import {configureStore} from '@reduxjs/toolkit';
import TasksReduser from './TaskManegerSlice';
import UserReducer from './UserProfileSlice';

export default configureStore({
  reducer: {TasksManeger: TasksReduser, UserProfile: UserReducer},
});
