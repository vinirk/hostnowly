import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StayType } from "types";
import StaysService from "./staysService";

export interface StaysState {
  items: StayType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StaysState = {
  items: [],
  status: "idle",
  error: null,
};

const fetchStays = createAsyncThunk("stays/fetchStays", async () => {
  const response = await StaysService.getStays();
  return response;
});

const staysSlice = createSlice({
  name: "stays",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStays.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStays.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.map((stay) => ({
          ...stay,
          galleryImgs: stay.galleryImgs || [],
        }));
      })
      .addCase(fetchStays.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch stays";
      });
  },
});

export default staysSlice;
export { fetchStays };
// export const { action1, action2 } = staysSlice.actions;
