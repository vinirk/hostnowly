import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BlockedDates, BookingType } from 'types';
import {
  calculateBookingCost,
  generateConfirmationCode,
  validateBookingAvailability,
} from 'utils/bookingOperations';
import generateTimestampId from 'utils/idGenerator';

export interface FiltersPayload {
  price?: number;
  location?: string;
  startDate?: string;
  endDate?: string;
  guestAdults?: number;
  guestChildren?: number;
}

interface BookingState {
  confirmedBookings: BookingType[];
  blockedDates: BlockedDates[];
  details: {
    subtotal: number;
    serviceFee: number;
    nights: number;
    subtotalAdults: number;
    subtotalChildren: number;
  };
  filter: {
    price: number;
    location: string;
    startDate: string;
    endDate: string;
    guestAdults: number;
    guestChildren: number;
  };
}

const initialState: BookingState = {
  confirmedBookings: [],
  blockedDates: [],
  details: {
    subtotal: 0,
    serviceFee: 0,
    nights: 0,
    subtotalAdults: 0,
    subtotalChildren: 0,
  },
  filter: {
    price: 0,
    location: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    guestAdults: 1,
    guestChildren: 0,
  },
};

export const confirmBookingAsync = createAsyncThunk(
  'booking/confirmBooking',
  async ({ stayId }: any, { getState }) => {
    const state = (getState() as RootState).booking;
    const isBooked = validateBookingAvailability(
      stayId,
      state.confirmedBookings,
      state.filter.startDate,
      state.filter.endDate
    );

    if (!isBooked) {
      const newBooking: BookingType = {
        id: generateTimestampId(),
        stayId,
        adults: state.filter.guestAdults,
        children: state.filter.guestChildren,
        startDate: new Date(state.filter.startDate).toISOString(),
        endDate: new Date(state.filter.endDate).toISOString(),
        confirmationDate: new Date().toISOString(),
        confirmationCode: generateConfirmationCode(8),
        totalPrice: state.details.subtotal + state.details.serviceFee,
      };
      return newBooking;
    }
    throw new Error('Booking is already confirmed for these dates');
  }
);

export const cancelBookingAsync = createAsyncThunk(
  'booking/cancelBooking',
  async ({ id }: any, { getState }) => {
    const state = (getState() as RootState).booking;

    const currentBooking = state.confirmedBookings.find(
      (booking) => booking.id === id
    );

    const cancelledBooking: BookingType = {
      ...currentBooking!,
      cancellationDate: new Date().toISOString(),
    };

    return cancelledBooking;
  }
);

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FiltersPayload>) => {
      state.filter = { ...state.filter, ...action.payload };
      // If price is set, calculate booking details
      // Homepage does not have price, so we need to check
      if (action.payload.price) {
        const bookingDetails = calculateBookingCost(
          action.payload.price,
          state.filter.startDate,
          state.filter.endDate,
          state.filter.guestAdults,
          state.filter.guestChildren
        );
        state.details = { ...state.details, ...bookingDetails };
      }

      state.filter.startDate =
        action.payload.startDate ?? state.filter.startDate;
      state.filter.endDate = action.payload.endDate ?? state.filter.endDate;
      state.filter.guestAdults =
        action.payload.guestAdults ?? state.filter.guestAdults;
      state.filter.guestChildren =
        action.payload.guestChildren ?? state.filter.guestChildren;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmBookingAsync.fulfilled, (state, action) => {
        state.confirmedBookings = [...state.confirmedBookings, action.payload];
        state.blockedDates = [
          ...state.blockedDates,
          {
            start: action.payload.startDate,
            end: action.payload.endDate,
            stayId: action.payload.stayId,
            bookingId: action.payload.id,
          },
        ];
        state.filter = initialState.filter;
      })
      .addCase(confirmBookingAsync.rejected, (state, action) => {
        console.error('Dispatch error', action);
      })
      .addCase(cancelBookingAsync.fulfilled, (state, action) => {
        state.confirmedBookings = state.confirmedBookings.map((booking) => {
          if (booking.id === action.payload.id) {
            return {
              ...action.payload,
              cancellationDate: new Date().toISOString(),
            };
          }
          return booking;
        });

        state.blockedDates = state.blockedDates
          .map((blockedDate) => {
            if (blockedDate.bookingId !== action.payload.id) {
              return {
                ...blockedDate,
              };
            }
            return null;
          })
          .filter((blockedDate) => blockedDate !== null) as BlockedDates[];
      });
  },
});

export default bookingSlice;
export const { setFilters } = bookingSlice.actions;
