import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  paymentDetails: {
    checkinDate: null,
    checkoutDate: null,
    totalPrice: 0,
    propertyName: "",
    guests: 1,
    nights: 0,
  },

  loading: false,
  error: null,
  orderData: null,
};

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },

    getCheckoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getCheckoutSuccess: (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    },

    getVerifyRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getVerifySuccess: (state) => {
      state.loading = false;
      state.error = null;
    },

    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPayment: (state) => {
      state.orderData = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const paymentActions = paymentSlice.actions;

export const { setPaymentDetails } = paymentSlice.actions;

// Payment details selector
export const selectPaymentDetails = (state) =>
  state.payment.paymentDetails;

// Individual selectors
export const selectPaymentLoading = (state) =>
  state.payment.loading;

export const selectPaymentError = (state) =>
  state.payment.error;

export const selectOrderData = (state) =>
  state.payment.orderData;


// FIXED selectPaymentStatus
export const selectPaymentStatus = createSelector(
  [
    (state) => state.payment.loading,
    (state) => state.payment.error,
    (state) => state.payment.orderData,
  ],
  (loading, error, orderData) => ({
    loading,
    error,
    orderData,
  })
);

export default paymentSlice.reducer;