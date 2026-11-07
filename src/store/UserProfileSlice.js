import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from '../api';

const initialState = {
  isFetching: false,
  user: null,
  error: null,
};

export const userThunk = createAsyncThunk(
  'user/getUser',
  async (_, thunkAPI) => {
    try {
      const {data} = await axiosInstance.get('/', {params: {results: 1}});
      //   console.log(data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userThunk.pending, (state, {payload}) => {
      console.log('user fetching');
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(userThunk.fulfilled, (state, {payload}) => {
      console.log('user got data', payload.results);
      state.user = payload.results[0];
      state.isFetching = false;
    });
    builder.addCase(userThunk.rejected, (state, {payload}) => {
      console.log('user rejected');
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const {reducer, actions} = userSlice;
export default reducer;
