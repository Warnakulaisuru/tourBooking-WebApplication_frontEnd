import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UpdateTour = () => {
  const [tours, setTours] = useState([]);

  const fetchTours = () => {
    axios
      .get("http://localhost:4000/api/v1/tours", {
        withCredentials: true,
      })
      .then((res) => {
        setTours(res.data.data);
      })
      .catch((err) => console.error("Error fetching tours:", err));
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tour?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:4000/api/v1/tours/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        alert("Tour deleted successfully.");
        fetchTours(); // refresh list
      })
      .catch((err) => {
        console.error("Error deleting tour:", err);
        alert("Failed to delete tour.");
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Update Tours</h2>

      {tours.length === 0 ? (
        <p>No tours available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white rounded shadow p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={tour.photo}
                alt={tour.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold">{tour.title}</h3>
              <p className="text-gray-600 mb-2">{tour.desc}</p>
              <p className="font-semibold">Price: ${tour.price}</p>
              <p className="text-sm text-gray-500">City: {tour.city}</p>
              <p className="text-sm text-gray-500">Max Group Size: {tour.maxGroupSize}</p>

              <div className="mt-4 flex justify-between">
                <Link
                  to={`/update-tour/${tour._id}`}
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(tour._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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

export default UpdateTour;
