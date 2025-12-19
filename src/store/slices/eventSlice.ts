import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BookingDetails = {
  fullName: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  guests: string | null;
  eventType: string;
};

type EventState = {
  eventTypeId: string | null;
  bookingDetails: BookingDetails | null;
};

const initialState: EventState = {
  eventTypeId: null,
  bookingDetails: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEventTypeId(state, action: PayloadAction<string>) {
      state.eventTypeId = action.payload;
    },
    setBookingDetails(state, action: PayloadAction<BookingDetails>) {
      state.bookingDetails = action.payload;
    },
    resetEvent(state) {
      state.eventTypeId = null;
      state.bookingDetails = null;
    },
  },
});

export const {
  setEventTypeId,
  setBookingDetails,
  resetEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
