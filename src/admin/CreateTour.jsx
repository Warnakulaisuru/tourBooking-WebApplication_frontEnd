// // src/pages/CreateTour.jsx

// import React, { useState } from "react";
// import axios from "axios";

// const CreateTour = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     city: "",
//     address: "",
//     distance: "",
//     photo: "",
//     desc: "",
//     price: "",
//     maxGroupSize: "",
//     featured: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:4000/api/v1/tours", formData, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // replace with your auth token method
//         },
//       });
//       alert("Tour created successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create tour.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FEFFFF] p-6 flex justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg p-8 rounded-3xl w-full max-w-2xl space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-[#17252A] text-center">Create New Tour</h2>
//         {[
//           { label: "Title", name: "title" },
//           { label: "City", name: "city" },
//           { label: "Address", name: "address" },
//           { label: "Distance (km)", name: "distance", type: "number" },
//           { label: "Photo URL", name: "photo" },
//           { label: "Description", name: "desc" },
//           { label: "Price ($)", name: "price", type: "number" },
//           { label: "Max Group Size", name: "maxGroupSize", type: "number" },
//         ].map(({ label, name, type = "text" }) => (
//           <div key={name}>
//             <label className="block font-medium text-[#2B7A78]">{label}</label>
//             <input
//               type={type}
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
//               required
//             />
//           </div>
//         ))}

//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             name="featured"
//             checked={formData.featured}
//             onChange={handleChange}
//           />
//           <label className="text-[#2B7A78]">Featured Tour</label>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#3AAFA9] text-white py-2 rounded-xl hover:bg-[#2B7A78] transition"
//         >
//           Create Tour
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTour;

import React, { useState } from "react";
import axios from "axios";

const CreateTour = () => {
  // For image, keep it separately as a File object
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // get first selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use FormData to send multipart/form-data
      const data = new FormData();

      // Append all text fields
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });

      // Append the image file if selected
      if (imageFile) {
        data.append("photo", imageFile);
      }

      await axios.post("http://localhost:4000/api/v1/tours", data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      });
      alert("Tour created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create tour.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFFFF] p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-3xl w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-[#17252A] text-center">Create New Tour</h2>
        {[
          { label: "Title", name: "title" },
          { label: "City", name: "city" },
          { label: "Address", name: "address" },
          { label: "Distance (km)", name: "distance", type: "number" },
          { label: "Description", name: "desc" },
          { label: "Price ($)", name: "price", type: "number" },
          { label: "Max Group Size", name: "maxGroupSize", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium text-[#2B7A78]">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
              required
            />
          </div>
        ))}

        {/* Image Upload Input */}
        <div>
          <label className="block font-medium text-[#2B7A78]">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
            required
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label className="text-[#2B7A78]">Featured Tour</label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3AAFA9] text-white py-2 rounded-xl hover:bg-[#2B7A78] transition"
        >
          Create Tour
        </button>
      </form>
    </div>
  );
};

export default CreateTour;
