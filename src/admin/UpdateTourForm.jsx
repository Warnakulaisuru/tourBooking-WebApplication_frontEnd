import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTourForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tour data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/tours/${id}`, {
        withCredentials: true, // send cookies
      })
      .then((res) => {
        setFormData(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch tour data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4000/api/v1/tours/${id}`, formData, {
        withCredentials: true, // send cookies for auth
      })
      .then(() => {
        alert("Tour updated successfully!");
        navigate("/update-tour"); // adjust route as needed
      })
      .catch(() => {
        alert("Failed to update tour. Try again.");
      });
  };

  if (loading) return <p>Loading tour data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-3xl font-bold mb-6">Update Tour</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          placeholder="Distance"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          placeholder="Photo URL"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="maxGroupSize"
          value={formData.maxGroupSize}
          onChange={handleChange}
          placeholder="Max Group Size"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Update Tour
        </button>
      </form>
    </div>
  );
};

export default UpdateTourForm;
