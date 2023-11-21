import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  price?: number;
  location?: string;
  startDate?: string | null;
  endDate?: string | null;
  adults?: number;
  children?: number;
}

const initialState: FiltersState = {
  price: 0,
  location: "",
  startDate: new Date().toISOString(),
  endDate: null,
  adults: 1,
  children: 0,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FiltersState>) => {
      const payload = action.payload;
      state.startDate = payload.startDate;
      state.endDate = payload.endDate;
      if (payload.price !== undefined) state.price = payload.price;
      if (payload.location !== undefined) state.location = payload.location;
      if (payload.adults !== undefined) state.adults = payload.adults;
      if (payload.children !== undefined) state.children = payload.children;
    },
  },
});

export default filtersSlice;
export const { setFilters } = filtersSlice.actions;
