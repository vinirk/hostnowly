import {
  Action,
  ThunkAction,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import bookingSlice, { setBookingDetail } from 'features/booking/bookingSlice';
import filtersSlice, { setFilters } from 'features/filters/filtersSlice';
import generalSlice from 'features/general/generalSlice';
import staysSlice from 'features/stays/staysSlice';
import logger from 'redux-logger';
import { calculateBookingCost } from 'utils/bookingOperations';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setFilters,
  effect: async (action, listenerApi) => {
    const filters = (listenerApi.getState() as RootState).filters;
    const { startDate, endDate, adults, children, price } = filters;

    if (startDate && endDate && price && (adults || children)) {
      const bookingDetails = calculateBookingCost(
        price,
        startDate,
        endDate,
        adults || 1,
        children || 0
      );
      listenerApi.dispatch(setBookingDetail(bookingDetails));
    }
  },
});

export const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer,
    general: generalSlice.reducer,
    stays: staysSlice.reducer,
    filters: filtersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
