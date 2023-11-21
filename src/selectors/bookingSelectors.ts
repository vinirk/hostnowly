import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { StayType } from "types";

export const makeGetStayById = () =>
  createSelector(
    (state: RootState) => state.stays.items,
    (state: RootState, props: { id: string }) => props.id,
    (stays: StayType[], id: string) => {
      if (id) {
        return stays.find((stay) => stay.id === id) || null;
      }
      return null;
    },
  );

const selectAllBlockedDates = (state: RootState) =>
  state.booking?.blockedDates || [];

export const selectBlockedDatesByStayId = (stayId?: string) =>
  createSelector([selectAllBlockedDates], (blockedDates) => {
    if (!stayId) return [];
    return blockedDates
      .filter((date) => date.stayId === stayId)
      .map((interval) => ({
        start: new Date(interval.start),
        end: new Date(interval.end),
      }));
  });
