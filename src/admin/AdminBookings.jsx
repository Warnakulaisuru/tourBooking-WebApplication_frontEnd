import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No token found.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:4000/api/v1/booking", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setBookings(res.data.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:4000/api/v1/booking/confirm/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error("Failed to confirm booking", err);
      alert("Could not confirm booking.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:4000/api/v1/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings();
    } catch (err) {
      console.error("Failed to delete booking", err);
      alert("Could not delete booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border p-4 rounded-lg shadow bg-white"
            >
              <p><strong>Tour:</strong> {booking.tourName}</p>
              <p><strong>Name:</strong> {booking.fullName}</p>
              <p><strong>Email:</strong> {booking.userEmail}</p>
              <p><strong>Guests:</strong> {booking.guestSize}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Date:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleConfirm(booking._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
