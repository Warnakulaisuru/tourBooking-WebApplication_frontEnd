// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchBookings = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Unauthorized: No token found.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:4000/api/v1/booking", {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       setBookings(res.data.data);
//       setError("");
//     } catch (err) {
//       console.error("Failed to fetch bookings", err);
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirm = async (id) => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.put(
//         `http://localhost:4000/api/v1/booking/confirm/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchBookings();
//     } catch (err) {
//       console.error("Failed to confirm booking", err);
//       alert("Could not confirm booking.");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
//     if (!confirmDelete) return;

//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(`http://localhost:4000/api/v1/booking/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchBookings();
//     } catch (err) {
//       console.error("Failed to delete booking", err);
//       alert("Could not delete booking.");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-10">Loading bookings...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-600 mt-10">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="border p-4 rounded-lg shadow bg-white"
//             >
//               <p><strong>Tour:</strong> {booking.tourName}</p>
//               <p><strong>Name:</strong> {booking.fullName}</p>
//               <p><strong>Email:</strong> {booking.userEmail}</p>
//               <p><strong>Guests:</strong> {booking.guestSize}</p>
//               <p><strong>Phone:</strong> {booking.phone}</p>
//               <p><strong>Date:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
//               <p><strong>Status:</strong> {booking.status}</p>
//               <div className="mt-4 flex gap-4">
//                 <button
//                   onClick={() => handleConfirm(booking._id)}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={() => handleDelete(booking._id)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBookings;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchBookings = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Unauthorized: No token found.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:4000/api/v1/booking", {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       setBookings(res.data.data);
//       setError("");
//     } catch (err) {
//       console.error("Failed to fetch bookings", err);
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirm = async (id, userEmail) => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.put(
//         `http://localhost:4000/api/v1/booking/confirm/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
//       );

//       // Send email to user (assuming backend handles it when booking is confirmed)
//       await axios.post(
//         "http://localhost:4000/api/v1/booking/send-confirmation",
//         { bookingId: id, userEmail }, // or pass more info if required
//         { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
//       );

//       fetchBookings();
//     } catch (err) {
//       console.error("Failed to confirm booking", err);
//       alert("Could not confirm booking.");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
//     if (!confirmDelete) return;

//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(`http://localhost:4000/api/v1/booking/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       fetchBookings();
//     } catch (err) {
//       console.error("Failed to delete booking", err);
//       alert("Could not delete booking.");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-10">Loading bookings...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-600 mt-10">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="border p-4 rounded-lg shadow bg-white"
//             >
//               <p><strong>Tour:</strong> {booking.tourName || booking.tour?.title || "Unknown Tour"}</p>
//               <p><strong>Name:</strong> {booking.fullName}</p>
//               <p><strong>Email:</strong> {booking.userEmail}</p>
//               <p><strong>Guests:</strong> {booking.guestSize}</p>
//               <p><strong>Phone:</strong> {booking.phone}</p>
//               <p><strong>Date:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
//               <p><strong>Status:</strong> {booking.status}</p>
//               <div className="mt-4 flex gap-4">
//                 <button
//                   onClick={() => handleConfirm(booking._id, booking.userEmail)}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={() => handleDelete(booking._id)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBookings;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend base URL
  const BASE_URL = "http://localhost:4000/api/v1";

  // Fetch all bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/booking`, {
          withCredentials: true,
        });
        setBookings(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Confirm booking handler
  const handleConfirmBooking = async (bookingId) => {
    try {
      await axios.put(
        `${BASE_URL}/booking/confirm/${bookingId}`,
        null,
        { withCredentials: true }
      );

      // Update booking status locally after successful confirm
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b._id === bookingId ? { ...b, status: "confirmed" } : b
        )
      );

      alert("Booking confirmed successfully!");
    } catch (err) {
      console.error("Failed to confirm booking", err);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  // Delete booking handler
const handleDeleteBooking = async (bookingId) => {
  if (!window.confirm("Are you sure you want to delete this booking?")) return;

  try {
    const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
      method: "DELETE",
      credentials: "include",  // if your backend requires cookies or sessions
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Delete failed: " + (errorData.message || "Unknown error"));
      return;
    }

    setBookings((prevBookings) => prevBookings.filter((b) => b._id !== bookingId));
    alert("Booking deleted successfully.");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Something went wrong while deleting the booking.");
  }
};


  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Admin Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Tour Name</th>
              <th className="border border-gray-300 p-2">User Email</th>
              <th className="border border-gray-300 p-2">Guest Size</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
           {bookings.map((booking) => (
  <tr key={booking._id} className="text-center">
    <td className="border border-gray-300 p-2">{booking.tourName}</td>
    <td className="border border-gray-300 p-2">{booking.userEmail}</td>
    <td className="border border-gray-300 p-2">{booking.guestSize}</td>
    
    <td className={`border border-gray-300 p-2 capitalize font-semibold ${
      booking.status === "paid"
        ? "text-green-600"
        : booking.status === "confirmed"
        ? "text-blue-600"
        : "text-yellow-600"
    }`}>
      {booking.status || "pending"}
    </td>

    <td className="border border-gray-300 p-2 space-x-2">
      {/* Show Confirm button if status is pending */}
      {booking.status === "pending" && (
        <>
          <button
            onClick={() => handleConfirmBooking(booking._id)}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Confirm
          </button>

          <button
            onClick={() => handleDeleteBooking(booking._id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </>
      )}
    </td>
  </tr>
))}



          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;
