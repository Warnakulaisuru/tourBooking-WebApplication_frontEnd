import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: 120 },
    { title: "Total Tours", value: 45 },
    { title: "Bookings", value: 300 },
    { title: "Revenue", value: "$12,500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEF2F1] to-[#FEFFFF] flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#17252A]">Admin Dashboard</h1>
        <p className="text-gray-600 mt-3">Welcome back, Admin 👋</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-xl p-8 text-center hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-xl font-semibold text-[#2B7A78]">{item.title}</h3>
            <p className="text-4xl font-bold text-[#17252A] mt-4">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mt-12">
        <div className="bg-white rounded-3xl shadow-xl p-6 h-72 flex items-center justify-center text-gray-400">
          📊 Bookings Trend Chart Placeholder
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 h-72 flex items-center justify-center text-gray-400">
          📈 Revenue Breakdown Chart Placeholder
        </div>
      </div>
<div className="flex space-x-4 mt-12">
        <Link
          to="/create-tour"
          className="bg-[#3AAFA9] text-white px-6 py-3 rounded-xl shadow hover:bg-[#2B7A78] transition"
        >
          ➕ Create New Tour
        </Link>

        <Link
          to="/update-tour"
          className="bg-[#3AAFA9] text-white px-6 py-3 rounded-xl shadow hover:bg-[#2B7A78] transition"
        >
          ✏️ Update Tours
        </Link>

        <Link
          to="/admin/bookings"
          className="bg-[#3AAFA9] text-white px-6 py-3 rounded-xl shadow hover:bg-[#2B7A78] transition"
        >
           Bookings
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
