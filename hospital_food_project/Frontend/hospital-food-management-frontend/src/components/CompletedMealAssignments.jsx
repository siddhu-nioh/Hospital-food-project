import React, { useState, useEffect } from "react";
import axios from "axios";

const CompletedMealAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedPersonnel, setSelectedPersonnel] = useState("");

  // Fetch completed meal assignments
  const fetchCompletedAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pantry/assignments/unassigned");
      const completedAssignments = response.data.filter(
        (assignment) => assignment.preparationStatus === "Completed"
      );
      setAssignments(completedAssignments);
    } catch (error) {
      console.error("Error fetching completed assignments:", error);
    }
  };

  // Fetch delivery personnel
  const fetchPersonnel = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/delivery-personnel");
      setPersonnel(response.data);
    } catch (error) {
      console.error("Error fetching delivery personnel:", error);
    }
  };

  // Assign delivery to personnel
  const handleAssignDelivery = async () => {
    try {
      if (!selectedAssignment || !selectedPersonnel) {
        alert("Please select both a meal assignment and delivery personnel.");
        return;
      }

      await axios.post("http://localhost:5000/api/pantry/assign-to-delivery-personnel", {
        assignmentId: selectedAssignment._id,
        deliveryPersonnelId: selectedPersonnel,
      });

      alert("Delivery assigned successfully!");
      setSelectedAssignment(null);
      setSelectedPersonnel("");
      fetchCompletedAssignments(); // Refresh assignments
    } catch (error) {
      console.error("Error assigning delivery:", error);
    }
  };

  useEffect(() => {
    fetchCompletedAssignments();
    fetchPersonnel();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Completed Meal Assignments</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Pantry Staff</th>
            <th className="border px-4 py-2">Diet Chart</th>
            <th className="border px-4 py-2">Notes</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td className="border px-4 py-2">{assignment.pantryStaffId?.name}</td>
              <td className="border px-4 py-2">{assignment.dietChartId?.MealType}</td>
              <td className="border px-4 py-2">{assignment.notes}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className={`px-2 py-1 rounded ${
                    selectedAssignment?._id === assignment._id
                      ? "bg-gray-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {selectedAssignment?._id === assignment._id ? "Selected" : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mt-6">Assign to Delivery Personnel</h3>
      <select
        value={selectedPersonnel}
        onChange={(e) => setSelectedPersonnel(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Select Delivery Personnel</option>
        {personnel.map((person) => (
          <option key={person._id} value={person._id}>
            {person.name} - {person.contactInfo}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssignDelivery}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Assign Delivery
      </button>
    </div>
  );
};

export default CompletedMealAssignments;
