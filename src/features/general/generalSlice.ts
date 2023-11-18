import { createSlice } from '@reduxjs/toolkit';
import stays from 'data/jsons/stays';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    stays: stays,
  },
  reducers: {},
});

export default generalSlice;
