import axios from "axios";
import React, { useEffect, useState } from "react";

const PantryStaffModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState("");
  const [pantryStaffList, setPantryStaffList] = useState([]);

  // Fetch pantry staff list
  const fetchPantryStaff = async () => {
    try {
      const response = await axios.get("https://hospital-food-project-backend.onrender.com/api/pantry/pantryStaff");
      setPantryStaffList(response.data);
    } catch (error) {
      alert("Failed to fetch pantry staff");
    }
  };

  // Add a new pantry staff
  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://hospital-food-project-backend.onrender.com/api/pantry/pantryStaff", {
        name,
        contactInfo,
        location,
      });

      if (response.status === 201) {
        alert("Pantry staff added successfully");
        setName(""); // Clear input fields
        setContactInfo("");
        setLocation("");
        fetchPantryStaff(); // Refresh list after adding
      } else {
        alert(response.data.error || "Failed to add pantry staff");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Server error");
    }
  };

  useEffect(() => {
    fetchPantryStaff(); // Fetch pantry staff list on mount
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Pantry Staff Management</h2>

        {/* Form for adding pantry staff */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Contact Info</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Pantry Staff List */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Pantry Staff List</h3>
          {pantryStaffList.length === 0 ? (
            <p className="text-gray-600">No pantry staff available</p>
          ) : (
            <ul className="border rounded p-4 bg-white overflow-y-auto max-h-32">
              {pantryStaffList.map((staff) => (
                <li key={staff._id} className="mb-2 border-b pb-2">
                  <p><strong>Name:</strong> {staff.name}</p>
                  <p><strong>Contact Info:</strong> {staff.contactInfo}</p>
                  <p><strong>Location:</strong> {staff.location}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PantryStaffModal;
