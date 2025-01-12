import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryPersonnelTable = ({ onDelete }) => {
  
  const [personnel, setPersonnel] = useState([]);
  const fetchPersonnel = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/delivery-personnel");
      setPersonnel(response.data);
    } catch (error) {
      console.error("Error fetching delivery personnel:", error);
    }
  };
  useEffect(() => {
    fetchPersonnel();
  }, []);

  const handleDeletePersonnel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delivery-personnel/${id}`);
      fetchPersonnel(); // Refresh the list after deletion
      if (onDelete) onDelete(); // Optional callback for parent updates
    } catch (error) {
      console.error("Error deleting personnel:", error);
    }
  };

  return (
    <div>
    <h1>Delivery personnel table</h1>
    <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
      <thead>
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
  );
};

export default DeliveryPersonnelTable;
