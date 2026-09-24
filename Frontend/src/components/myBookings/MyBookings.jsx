import React, { useEffect } from "react";
import "../../css/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingDetails,
  fetchUserBookings,
} from "../../store/Booking/booking-action";

const MyBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bookings, loading } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    // Fetch bookings of the logged-in user
    dispatch(fetchUserBookings());
  }, [dispatch]);

  console.log("BOOKINGS IN MYBOOKINGS:", bookings);

  const handleBookingClick = (bookingId) => {
    dispatch(fetchBookingDetails(bookingId));
    navigate(`/user/myBookings/${bookingId}`);
  };

  // Loading
  if (loading) {
    return <LoadingSpinner />;
  }

  // No bookings
  if (bookings.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h3>Nothing booked yet</h3>
      </div>
    );
  }

  return (
    <>
      <ProgressSteps />

      <div className="wow">
        {!loading &&
          bookings.length > 0 &&
          bookings.map((booking) => (
            <div
              className="main-container"
              onClick={() => handleBookingClick(booking._id)}
              key={booking._id}
            >
              <div className="mybookings-container row">

                {/* Property Image */}
                <div className="image-container col-lg-3 col-md-3">
                  <img
                    className="booking-img"
                    src={
                      booking.property?.images &&
                      booking.property.images.length > 0
                        ? booking.property.images[0].url
                        : undefined
                    }
                    alt="booking"
                  />
                </div>

                {/* Booking Information */}
                <div className="booking-information col-lg-9 col-md-9">

                  {/* Property Name */}
                  <h6 className="hotel-name">
                    {booking.property?.propertyName}
                  </h6>

                  {/* Stay Information */}
                  <div className="stay-information">

                    {/* Nights */}
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        bedtime
                      </span>

                      {booking.numberOfnights} nights
                    </span>

                    {/* Check-in Date */}
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        calendar_month
                      </span>

                      {new Date(
                        booking.fromDate
                      ).toLocaleDateString()}
                    </span>

                    {/* Arrow */}
                    <span className="material-symbols-outlined icon">
                      arrow_forward
                    </span>

                    {/* Check-out Date */}
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        calendar_month
                      </span>

                      {new Date(
                        booking.toDate
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  {/* Price */}
                  <h5 className="booking-price">
                    <span className="material-symbols-outlined">
                      payments
                    </span>

                    {" "}
                    Total Price : ₹ {booking.price}
                  </h5>

                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyBookings;