import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import bookingSlice from 'features/booking/bookingSlice';
import generalSlice from 'features/general/generalSlice';
import staysSlice from 'features/stays/staysSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer,
    general: generalSlice.reducer,
    stays: staysSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
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
