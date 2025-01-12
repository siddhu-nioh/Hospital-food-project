import React, { useEffect, useState } from "react";
import axios from "axios";
import { updateDietChart, deleteDietChart } from "../api/api";

const DietChartTable = () => {
  const [dietCharts, setDietCharts] = useState([]);
  const [editingChart, setEditingChart] = useState(null);
  const [editFormData, setEditFormData] = useState({
    patientId: "",
    MealType: "",
    ingredients: "",
    instructions: "",
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

 
    const fetchDietCharts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/diet-charts");
        setDietCharts(res.data);
      } catch (err) {
        console.error("Error fetching diet charts:", err);
      }
    };
    useEffect(() => {
    fetchDietCharts();
  }, []);

  const handleEditClick = (chart) => {
    setEditingChart(chart._id);
    setEditFormData({
      patientId: chart.patientId?._id || "",
      MealType: chart.MealType,
      ingredients: chart.ingredients.join(", "),
      instructions: chart.instructions || "",
      status: chart.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    if (!editFormData.MealType || !editFormData.ingredients || !editFormData.status) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const updatedChart = {
        ...editFormData,
        ingredients: editFormData.ingredients.split(",").map((ing) => ing.trim()),
      };

      await updateDietChart(editingChart, updatedChart);

      setDietCharts((prevCharts) =>
        prevCharts.map((chart) =>
          chart._id === editingChart ? { ...chart, ...updatedChart } : chart
        )
      );

      setEditingChart(null);
      setErrorMessage("");
      fetchDietCharts();
    } catch (err) {
      console.error("Error updating diet chart:", err);
      setErrorMessage(err.response?.data?.message || "Failed to update diet chart.");
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this diet chart?")) return;

    try {
      await deleteDietChart(id);
      setDietCharts((prevCharts) => prevCharts.filter((chart) => chart._id !== id));
    } catch (err) {
      console.error("Error deleting diet chart:", err);
      alert("Failed to delete diet chart.");
    }
  };

  return (
    <div className="overflow-x-auto mt-6 p-6">
      {/* Modal */}
      {editingChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-lg font-bold mb-4">Edit Diet Chart</h2>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Patient Name</label>
                <input
                  type="text"
                  name="patientId"
                  value={editFormData.patientId }
                  className="border rounded px-3 py-2 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Meal Type</label>
                <input
                  type="text"
                  name="MealType"
                  value={editFormData.MealType}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Ingredients</label>
                <input
                  type="text"
                  name="ingredients"
                  value={editFormData.ingredients}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Instructions</label>
                <textarea
                  name="instructions"
                  value={editFormData.instructions}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Status</label>
                <input
                  type="text"
                  name="status"
                  value={editFormData.status}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingChart(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Diet Chart Table */}
      <table className="table-pantry table-auto overflow-y-auto overflow-x-auto max-h-52 w-sm font-sans border-collapse shadow-lg">
        <thead>
          <tr>
            <th className="border px-4 py-2">Patient</th>
            <th className="border px-4 py-2">Meal Type</th>
            <th className="border px-4 py-2">Ingredients</th>
            <th className="border px-4 py-2">Instructions</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dietCharts.map((chart) => (
            <tr key={chart._id}>
              <td className=" px-4 py-2">{chart.patientId?.name || "N/A"}</td>
              <td className=" px-4 py-2">{chart.MealType}</td>
              <td className=" px-4 py-2">{chart.ingredients.join(", ")}</td>
              <td className=" px-4 py-2">{chart.instructions || "No instructions provided"}</td>
              <td className=" px-4 py-2">{chart.status}</td>
              <td className=" px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => handleEditClick(chart)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                  onClick={() => handleDeleteClick(chart._id)}
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

export default DietChartTable;
