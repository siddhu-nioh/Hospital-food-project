import axios from "axios";
import React, { useEffect, useState } from "react";

const DeliveryPersonnelManagement = () => {
  const [personnel, setPersonnel] = useState([]);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const fetchPersonnel = async () => {
    try {
      const response = await axios.get("https://hospital-food-project-backend.onrender.com/api/delivery-personnel");
      setPersonnel(response.data);
    } catch (error) {
      console.error("Error fetching delivery personnel:", error);
    }
  };

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const handleAddPersonnel = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://hospital-food-project-backend.onrender.com/api/delivery-personnel", { name, contactInfo });
      fetchPersonnel();
      setName("");
      setContactInfo("");
      alert("Delivery Personnel added successfully!");
    } catch (error) {
      console.error("Error adding personnel:", error);
    }
  };

  const handleDeletePersonnel = async (id) => {
    try {
      await axios.delete(`https://hospital-food-project-backend.onrender.com/api/delivery-personnel/${id}`);
      fetchPersonnel();
    } catch (error) {
      console.error("Error deleting personnel:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddPersonnel} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="border p-2 w-full"
        />
        <input
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder="Contact Info"
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Add Personnel
        </button>
      </form>
      <div className="overflow-y-auto max-h-36 relative">
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300  relative">
        <thead className="sticky top-0 bg-gray-200">
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Contact Info</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnel.map((person) => (
            <tr key={person._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{person.name}</td>
              <td className="border border-gray-300 px-4 py-2">{person.contactInfo}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeletePersonnel(person._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DeliveryPersonnelManagement;
