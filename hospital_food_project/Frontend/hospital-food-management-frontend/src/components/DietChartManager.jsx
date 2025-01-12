import React, { useState, useEffect } from "react";
import socket from "../api/socket";
import {
  getDietCharts,
  createDietChart,
  updateDietChart,
  getPatients,
  deleteDietChart
} from "../api/api";

const DietChartManager = () => {
  const [patients, setPatients] = useState([]);
  const [dietCharts, setDietCharts] = useState([]); // State for diet chart list
  const [form, setForm] = useState({
    patientId: "",
    MealType: "Morning Meals",
    ingredients: "",
    instructions: "",
  });
  const [message, setMessage] = useState(""); // State for success message
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPatients();
    loadDietCharts();

    socket.on("dietChartUpdated", (updatedChart) => {
      setDietCharts((prev) =>
        prev.map((chart) => (chart._id === updatedChart._id ? updatedChart : chart))
      );
      setMessage("A diet chart was updated.");
    });

    return () => socket.off("dietChartUpdated");
  }, []);

  const loadPatients = async () => {
    try {
      const { data } = await getPatients();
      setPatients(data);
    } catch (err) {
      console.error("Error loading patients:", err);
    }
  };

  const loadDietCharts = async () => {
    try {
      const { data } = await getDietCharts();
      setDietCharts(data);
    } catch (err) {
      console.error("Error loading diet charts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dietChartData = {
      ...form,
      ingredients: form.ingredients.split(",").map((ingredient) => ingredient.trim()),
    };

    try {
      if (form.id) {
        await updateDietChart(form.id, dietChartData);
        setMessage("Diet chart updated successfully!");
      } else {
        await createDietChart(dietChartData);
        setMessage("Diet chart created successfully!");
      }

      setForm({ patientId: "", MealType: "Morning Meals", ingredients: "", instructions: "" });
      setIsModalOpen(false);
      loadDietCharts();
    } catch (err) {
      console.error("Error saving diet chart:", err);
    }
  };

  const handleEdit = (chart) => {
    setForm({
      id: chart._id,
      patientId: chart.patientId,
      MealType: chart.MealType,
      ingredients: chart.ingredients.join(", "),
      instructions: chart.instructions,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDietChart(id);
      loadDietCharts();
      setMessage("Diet chart deleted successfully!");
    } catch (err) {
      console.error("Error deleting diet chart:", err);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg overflow-auto max-h-max">
      <h2 className="text-2xl font-bold mb-4">Diet Chart Management</h2>

      {message && (
        <div className="text-green-600 bg-green-100 p-4 rounded mb-4">{message}</div>
      )}

      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-6"
      >
        Create New Diet Chart
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-lg font-bold mb-4">
              {form.id ? "Edit Diet Chart" : "Create Diet Chart"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
              <select
                value={form.patientId}
                onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                className="border p-2 rounded col-span-2"
                required
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              <select
                value={form.MealType}
                onChange={(e) => setForm({ ...form, MealType: e.target.value })}
                className="border p-2 rounded col-span-2"
              >
                <option value="Morning Meals">Morning Meals</option>
                <option value="Evening Meals">Evening Meals</option>
                <option value="Night Meals">Night Meals</option>
              </select>
              <input
                type="text"
                placeholder="Ingredients (comma-separated)"
                value={form.ingredients}
                onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                className="border p-2 rounded col-span-2"
              />
              <textarea
                placeholder="Instructions"
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                className="border p-2 rounded col-span-2"
              ></textarea>
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  {form.id ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Diet Chart List */}
      <ul className="divide-y divide-gray-300 overflow-y-auto h-52">
        {dietCharts.map((chart) => (
          <li key={chart._id} className="py-4 flex justify-between items-center">
            <div>
              <p>
                <strong>Patient:</strong> {chart.patientId?.name || "N/A"}
              </p>
              <p>
                <strong>Meal Type:</strong> {chart.MealType}
              </p>
              <p>
                <strong>Ingredients:</strong> {chart.ingredients.join(", ")}
              </p>
              <p>
                <strong>Instructions:</strong> {chart.instructions || "No instructions provided"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(chart)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(chart._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DietChartManager;
