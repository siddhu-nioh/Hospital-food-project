import React, { useState, useEffect } from "react";
import axios from "axios";

const PantryStaffList = () => {
  const [pantryStaff, setPantryStaff] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({ name: "", contactInfo: "", location: "" });

  const fetchPantryStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pantry/pantryStaff");
      setPantryStaff(response.data);
    } catch (error) {
      console.error("Error fetching pantry staff:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pantry/pantryStaff/${id}`);
      alert("Pantry staff deleted successfully");
      fetchPantryStaff(); // Refresh list
    } catch (error) {
      console.error("Error deleting pantry staff:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/pantry/pantryStaff/${id}`, formData);
      alert("Pantry staff updated successfully");
      setEditMode(null); // Exit edit mode
      fetchPantryStaff(); // Refresh list
    } catch (error) {
      console.error("Error updating pantry staff:", error);
    }
  };

  const handleEdit = (staff) => {
    setEditMode(staff._id);
    setFormData({ name: staff.name, contactInfo: staff.contactInfo, location: staff.location });
  };

  useEffect(() => {
    fetchPantryStaff();
  }, []);

  return (
    <div className="bg-white p-0 rounded-lg ">
      {/* <h2 className="text-xl font-bold mb-4">Pantry Staff List</h2> */}
      <table className="table-pantry min-w-full border-collapse   shadow-lg">
        <thead className="bg-gray-200 ">
          <tr>
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Contact Info</th>
            <th className=" px-4 py-2">Location</th>
            <th className=" px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pantryStaff.map((staff) =>
            editMode === staff._id ? (
              <tr key={staff._id}>
                <td className=" ">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border rounded  "
                  />
                </td>
                <td className=" ">
                  <input
                    type="text"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    className="border rounded  "
                  />
                </td>
                <td className=" ">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="border rounded "
                  />
                </td>
                <td className=" ">
                  <button
                    onClick={() => handleUpdate(staff._id)}
                    className="bg-blue-500 text-white p-1 rounded-lg "
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(null)}
                    className="bg-gray-500 text-white p-1 rounded-lg"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={staff._id}>
                <td className=" px-4 py-2">{staff.name}</td>
                <td className=" px-4 py-2">{staff.contactInfo}</td>
                <td className=" px-4 py-2">{staff.location}</td>
                <td className=" px-4 py-2">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PantryStaffList;
