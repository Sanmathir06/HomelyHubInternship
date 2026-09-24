import React, { useEffect } from "react";
import "../../css/BookingDetails.css";
import PropertyImg from "../propertyListing/PropertyImg";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { fetchBookingDetails } from "../../store/Booking/booking-action";
import { useDispatch, useSelector } from "react-redux";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();

  const { bookingDetails, loading } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingDetails(bookingId));
    }
  }, [dispatch, bookingId]);

  console.log("BOOKING DETAILS:", bookingDetails);

  // Show loading while fetching
  if (loading) {
    return (
      <div className="row justify-content-around mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  // Show loading if booking/property data is not available yet
  if (!bookingDetails || !bookingDetails.property) {
    return (
      <div className="row justify-content-around mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="details-container">

      {/* Property Name */}
      <p className="details-header">
        {bookingDetails.property.propertyName}
      </p>

      {/* Location */}
      <h6 className="details-location">
        <span className="material-symbols-outlined">
          location_on
        </span>

        <span className="location">
          {bookingDetails.property.address?.area},{" "}
          {bookingDetails.property.address?.city},{" "}
          {bookingDetails.property.address?.pincode},{" "}
          {bookingDetails.property.address?.state}
        </span>
      </h6>

      {/* Booking Information */}
      <div className="details-information-container">

        <div className="details-information">

          <h5>Booking Information</h5>

          <section className="booking-stay-information">

            {/* Number of Nights */}
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                bedtime
              </span>

              {bookingDetails.numberOfnights} nights
            </span>

            {/* Check-in Date */}
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>

              {new Date(
                bookingDetails.fromDate
              ).toLocaleDateString()}
            </span>

            {/* Arrow */}
            <span className="material-symbols-outlined stay-icon">
              arrow_forward
            </span>

            {/* Check-out Date */}
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>

              {new Date(
                bookingDetails.toDate
              ).toLocaleDateString()}
            </span>

          </section>
        </div>

        {/* Total Price */}
        <div className="details-total-price-container">

          <div className="details-total-price">

            <p className="price-header">
              Total Price
            </p>

            <span className="price-in-number">
              ₹ {bookingDetails.price}
            </span>

          </div>

        </div>
      </div>

      {/* Property Images */}
      <PropertyImg
        images={bookingDetails.property.images || []}
      />

    </div>
  );
};

export default BookingDetails;