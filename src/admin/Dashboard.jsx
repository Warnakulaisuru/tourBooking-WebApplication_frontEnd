import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Users", value: "..." },
    { title: "Total Tours", value: "..." },
    { title: "Bookings", value: "..." },
    { title: "Feedback", value: "..." },
  ]);
  const [bookingTrend, setBookingTrend] = useState([]);
  const [popularTour, setPopularTour] = useState({ name: "...", count: "..." });
  const [tourBookings, setTourBookings] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/dashboard/stats", {
          withCredentials: true,
        });
        const { totalUsers, totalTours, totalBookings, totalReviews } = res.data.data;
        setStats([
          { title: "Total Users", value: totalUsers },
          { title: "Total Tours", value: totalTours },
          { title: "Bookings", value: totalBookings },
          { title: "Feedback", value: totalReviews },
        ]);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    const fetchBookingTrend = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/dashboard/bookings-trend", {
          withCredentials: true,
        });
        setBookingTrend(res.data.data);
      } catch (err) {
        console.error("Failed to fetch booking trend", err);
      }
    };

    const fetchPopularTour = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/dashboard/popular-tour", {
          withCredentials: true,
        });
        const { _id, bookings } = res.data.data;
        setPopularTour({ name: _id, count: bookings });
      } catch (err) {
        console.error("Failed to fetch popular tour", err);
      }
    };

    const fetchTourBookings = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/dashboard/tour-bookings", {
          withCredentials: true,
        });
        setTourBookings(res.data.data);
      } catch (err) {
        console.error("Failed to fetch tour bookings", err);
      }
    };

    fetchStats();
    fetchBookingTrend();
    fetchPopularTour();
    fetchTourBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEF2F1] to-[#FEFFFF] p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#17252A]">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Admin 👋</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-2xl p-6 text-center transition transform hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-[#2B7A78]">{item.title}</h3>
            <p className="text-4xl font-bold text-[#17252A] mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Monthly Bookings Line Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#2B7A78]">📊 Monthly Bookings</h3>
          {bookingTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3AAFA9"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">Loading chart...</p>
          )}
        </div>

        {/* Bookings per Tour Bar Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#2B7A78]">🧭 Bookings per Tour</h3>
          {tourBookings.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tourBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tourName" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2B7A78" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">Loading chart...</p>
          )}
        </div>
      </div>

      {/* Most Popular Tour */}
      <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-2xl p-6 text-center">
        <h3 className="text-xl font-semibold text-[#2B7A78] mb-2">🏆 Most Popular Tour</h3>
        <p className="text-2xl font-bold text-[#17252A]">
          {popularTour.name}
          <span className="text-sm text-gray-500 ml-2">
            ({popularTour.count} bookings)
          </span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;