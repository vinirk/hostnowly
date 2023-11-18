import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FiltersState {
  price?: number;
  location?: string;
  startDate?: string;
  endDate?: string;
  guestAdults?: number;
  guestChildren?: number;
}

const initialState: FiltersState = {
  price: 0,
  location: '',
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  guestAdults: 1,
  guestChildren: 0,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FiltersState>) => {
      state = { ...state, ...action.payload };
    },
    clearFilters(state) {},
  },
});

export default filtersSlice;
// export const { action1, action2 } = filtersSlice.actions;
