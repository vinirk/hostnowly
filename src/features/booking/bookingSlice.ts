import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { BlockedDateType, BookingType } from "types";
import {
  generateConfirmationCode,
  validateBookingAvailability,
} from "utils/bookingOperations";
import generateTimestampId from "utils/idGenerator";

interface BookingDetailPayload {
  subtotal: number;
  serviceFee: number;
  nights: number;
  subtotalAdults: number;
  subtotalChildren: number;
}

interface BookingState {
  confirmedBookings: BookingType[];
  blockedDates: BlockedDateType[];
  detail: BookingDetailPayload;
}

const initialState: BookingState = {
  confirmedBookings: [],
  blockedDates: [],
  detail: {
    subtotal: 0,
    serviceFee: 0,
    nights: 0,
    subtotalAdults: 0,
    subtotalChildren: 0,
  },
};

export const confirmBookingAsync = createAsyncThunk(
  "booking/confirmBooking",
  async ({ stayId }: any, { getState }) => {
    console.log(stayId, "stayid");
    const filter = (getState() as RootState).filters;
    const detail = (getState() as RootState).booking.detail;
    const confirmedBookings = (getState() as RootState).booking
      .confirmedBookings;
    const isBooked = validateBookingAvailability(
      stayId,
      confirmedBookings,
      normalizeDate(filter?.startDate ?? ""),
      normalizeDate(filter.endDate ?? ""),
    );

    if (!isBooked) {
      const newBooking: BookingType = {
        id: generateTimestampId(),
        stayId,
        adults: filter.adults ?? 0,
        children: filter.children ?? 0,
        startDate: normalizeDate(filter?.startDate ?? ""),
        endDate: normalizeDate(filter.endDate ?? ""),
        confirmationDate: new Date().toISOString(),
        confirmationCode: generateConfirmationCode(8),
        totalPrice: detail.subtotal + detail.serviceFee,
      };
      return newBooking;
    }
    throw new Error("Booking is already confirmed for these dates");
  },
);

export const cancelBookingAsync = createAsyncThunk(
  "booking/cancelBooking",
  async ({ id }: any, { getState }) => {
    const state = (getState() as RootState).booking;

    const currentBooking = state.confirmedBookings.find(
      (booking) => booking.id === id,
    );

    const canceledBooking: BookingType = {
      ...currentBooking!,
      cancellationDate: new Date().toISOString(),
    };

    return canceledBooking;
  },
);

const normalizeDate = (dateStr?: string) => {
  if (dateStr === null) return new Date().toISOString();
  const date = new Date(dateStr ?? "");
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setBookingDetail: (state, action: PayloadAction<BookingDetailPayload>) => {
      state.detail = { ...state.detail, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmBookingAsync.fulfilled, (state, action) => {
        state.confirmedBookings = [...state.confirmedBookings, action.payload];
        state.blockedDates = [
          ...state.blockedDates,
          {
            start: normalizeDate(action.payload.startDate),
            end: normalizeDate(action.payload.endDate),
            stayId: action.payload.stayId,
            bookingId: action.payload.id,
          },
        ];
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
          .filter((blockedDate) => blockedDate !== null) as BlockedDateType[];
      });
  },
});

export default bookingSlice;
export const { setBookingDetail } = bookingSlice.actions;
