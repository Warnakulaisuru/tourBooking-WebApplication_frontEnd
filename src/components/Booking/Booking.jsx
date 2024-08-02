import React, { useContext, useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    bookAt: "",
    guestSize: "1",
  });
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Book Now");

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "guestSize" && value < 1) {
      setBooking((prev) => ({ ...prev, [id]: "1" }));
    } else {
      setBooking((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handlePhoneChange = (value, country) => {
    setBooking((prev) => ({ ...prev, phone: value }));

    // Validate phone number
    try {
      if (value.trim() === "") {
        setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
      } else {
        const phoneNumber = isValidPhoneNumber(value, country.countryCode);
        if (!phoneNumber) {
          setErrors((prev) => ({ ...prev, phone: "Invalid phone number" }));
        } else {
          setErrors((prev) => ({ ...prev, phone: "" }));
        }
      }
    } catch (error) {
      console.error("Error validating phone number:", error);
      setErrors((prev) => ({ ...prev, phone: "Invalid phone number" }));
    }
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  // Handle combined booking and email submission
  const handleButtonClick = async (e) => {
    e.preventDefault();
    setButtonText("Processing...");

    try {
      if (!user) {
        alert("Please sign in");
        setButtonText("Book Now");
        return;
      }

      // Validate booking date
      const bookingDate = new Date(booking.bookAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (bookingDate < today) {
        alert("Booking date must be in the future.");
        setButtonText("Book Now");
        return;
      }

      // Perform booking submission
      const bookingRes = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });
      const bookingResult = await bookingRes.json();

      if (!bookingRes.ok) {
        alert(bookingResult.message);
        setButtonText("Book Now");
        return;
      }

      // Perform email submission
      const emailServiceID = "default_service";
      const emailTemplateID = "template_iq62pya";

      const emailRes = await emailjs.sendForm(
        emailServiceID,
        emailTemplateID,
        e.target,
        "SLxAa0I4lmDE53Q3Q"
      );

      if (emailRes.status === 200) {
        alert("Booking successful and Email sent!");
        navigate("/thank-you");
      } else {
        alert("Booking successful but failed to send Email.");
        navigate("/thank-you");
      }
    } catch (err) {
      alert(err.message);
      setButtonText("Book Now");
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* --booking form start-- */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info--form" onSubmit={handleButtonClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="email"
              placeholder="Your email"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <PhoneInput
              country={"us"}
              value={booking.phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" required onChange={handleChange} />
            <input
              type="number"
              placeholder="Guest Size"
              id="guestSize"
              value={booking.guestSize}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <Button
            type="submit"
            className="btn primary__btn w-100 mt-4"
            disabled={buttonText === "Processing..."}
          >
            {buttonText}
          </Button>
        </Form>
      </div>
      {/* --booking form end-- */}

      {/* --booking bottom-- */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price}
              <i className="ri-asterisk"></i> 1 person
            </h5>
            <span> ${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span> ${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span> ${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;
