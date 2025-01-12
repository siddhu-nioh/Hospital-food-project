import React, { useState, useEffect } from "react";
import axios from "axios";

const MealAssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedNotes, setUpdatedNotes] = useState("");

  // Fetch meal assignments
  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pantry/assignments");
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching meal assignments:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAssignments();
  }, []);

  // Save updated preparation status and notes
  const updateAssignment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/pantry/update-status/${editingAssignment._id}`,
        { preparationStatus: updatedStatus, notes: updatedNotes }
      );

      setAssignments(
        assignments.map((assignment) =>
          assignment._id === editingAssignment._id
            ? {
                ...assignment,
                preparationStatus: response.data.assignment.preparationStatus,
                notes: response.data.assignment.notes,
              }
            : assignment
        )
      );
      alert("Assignment updated successfully!");
      setEditingAssignment(null);
      setUpdatedStatus("");
      setUpdatedNotes("");
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  return (
    <div className="mt-4 max-h-98">
      <h2 className="text-2xl font-bold mb-4"></h2>
      <table className="table-pantry w-sm  overflow-y-auto max-h-40 border-collapse shadow-xl">
        <thead>
          <tr>
            <th className="border px-4 py-2">Pantry Staff</th>
            <th className="border px-4 py-2">Diet Chart</th>
            <th className="border px-4 py-2">Notes</th>
            <th className="border px-4 py-2">Preparation Status</th>
            <th className="border px-4 py-2">Delivery ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td className=" px-4 py-2">{assignment.pantryStaffId?.name}</td>
              <td className=" px-4 py-2">
                {assignment.dietChartId?.MealType} - {assignment.dietChartId?.instructions}
              </td>
              <td className=" px-4 py-2">
                {editingAssignment?._id === assignment._id ? (
                  <input
                    type="text"
                    value={updatedNotes}
                    onChange={(e) => setUpdatedNotes(e.target.value)}
                    className="border p-1 w-full"
                  />
                ) : (
                  assignment.notes
                )}
              </td>
              <td className=" px-4 py-2">
                {editingAssignment?._id === assignment._id ? (
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="border p-1 w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  assignment.preparationStatus || "Pending"
                )}
              </td>
              <td className=" px-4 py-2">
                {assignment.deliveryId ? assignment.deliveryId._id : "N/A"}
              </td>
              <td className=" px-4 py-2">
                {editingAssignment?._id === assignment._id ? (
                  <button
                    onClick={updateAssignment}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingAssignment(assignment);
                      setUpdatedStatus(assignment.preparationStatus || "Pending");
                      setUpdatedNotes(assignment.notes || "");
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealAssignmentTable;
