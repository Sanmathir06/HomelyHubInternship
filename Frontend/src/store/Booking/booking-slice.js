import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails: {},
  loading: false,
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    setBookingRequest: (state) => {
      state.loading = true;
    },

    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.loading = false;
    },

    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },

    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload.booking;
      state.loading = false;
    },
  },
});

export const {
  setBookings,
  addBooking,
  setBookingDetails,
  setBookingRequest,
} = bookingSlice.actions;

export default bookingSlice;