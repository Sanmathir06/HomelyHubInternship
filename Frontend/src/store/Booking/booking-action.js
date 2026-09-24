import { axiosInstance } from "../../utils/axios";
import {
  setBookingDetails,
  setBookings,
  setBookingRequest,
} from "./booking-slice";


// ------------------------------------
// FETCH ONE BOOKING
// ------------------------------------

export const fetchBookingDetails =
  (bookingId) => async (dispatch) => {
    try {
      dispatch(setBookingRequest());

      const response = await axiosInstance.get(
        `/v1/rent/user/booking/${bookingId}`
      );

      console.log(
        "Booking Details Response:",
        response.data
      );

      dispatch(
        setBookingDetails(response.data.data)
      );

    } catch (error) {
      console.error(
        "Error fetching booking details:",
        error
      );
    }
  };


// ------------------------------------
// FETCH ALL USER BOOKINGS
// ------------------------------------

export const fetchUserBookings =
  () => async (dispatch) => {

    try {

      dispatch(setBookingRequest());

      console.log("Fetching user bookings...");

      const response = await axiosInstance.get(
        "/v1/rent/user/booking"
      );

      console.log(
        "USER BOOKINGS RESPONSE:",
        response.data
      );

      console.log(
        "USER BOOKINGS:",
        response.data.data.bookings
      );

      dispatch(
        setBookings(
          response.data.data.bookings
        )
      );

    } catch (error) {

      console.error(
        "Error fetching bookings:",
        error
      );

    }
  };