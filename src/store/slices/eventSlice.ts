import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StepKey =
  | 'food'
  | 'drinks'
  | 'cake'
  | 'venue'
  | 'photography'
  | 'videography';

export type BookingDetails = {
  fullName: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  guests: string | null;
};

type EventState = {
  eventTypeId: string | null;
  bookingDetails: BookingDetails | null;
  selections: Record<StepKey, string[]>;
};

const ALL_STEP_KEYS: StepKey[] = [
  'food',
  'drinks',
  'cake',
  'venue',
  'photography',
  'videography',
];

const emptySelections = ALL_STEP_KEYS.reduce((acc, key) => {
  acc[key] = [];
  return acc;
}, {} as Record<StepKey, string[]>);

const initialState: EventState = {
  eventTypeId: null,
  bookingDetails: null,
  selections: emptySelections,
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

    addProduct(
      state,
      action: PayloadAction<{ step: StepKey; productId: string }>,
    ) {
      const { step, productId } = action.payload;
      if (!state.selections[step].includes(productId)) {
        state.selections[step].push(productId);
      }
    },

    removeProduct(
      state,
      action: PayloadAction<{ step: StepKey; productId: string }>,
    ) {
      const { step, productId } = action.payload;
      state.selections[step] = state.selections[step].filter(
        id => id !== productId,
      );
    },

    resetEvent() {
      return initialState;
    },
  },
});

export const {
  setEventTypeId,
  setBookingDetails,
  addProduct,
  removeProduct,
  resetEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
