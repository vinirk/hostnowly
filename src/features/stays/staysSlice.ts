import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StayType } from 'types';
import StaysService from './staysService';

interface StaysState {
  stays: StayType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StaysState = {
  stays: [],
  status: 'idle',
  error: null,
};

const fetchStays = createAsyncThunk('stays/fetchStays', async () => {
  const response = await StaysService.getStays();
  return response;
});

const staysSlice = createSlice({
  name: 'stays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStays.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStays.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stays = action.payload;
      })
      .addCase(fetchStays.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch stays';
      });
  },
});

export default staysSlice;
export { fetchStays };
// export const { action1, action2 } = staysSlice.actions;
