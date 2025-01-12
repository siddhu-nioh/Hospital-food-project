import React, { useState, useEffect } from "react";
import axios from "axios";

const MealAssignmentForm = () => {
  const [pantryStaff, setPantryStaff] = useState([]);
  const [dietCharts, setDietCharts] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    pantryStaffId: "",
    dietChartId: "",
    notes: "",
  });

  // Fetch data for dropdowns and assignments
  const fetchData = async () => {
    try {
      const [staffRes, dietChartsRes, assignmentsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/pantry/pantryStaff"), // Fetch pantry staff
        axios.get("http://localhost:5000/api/diet-charts"), // Fetch diet charts
        axios.get("http://localhost:5000/api/pantry/assignments"), // Fetch meal assignments
      ]);
      setPantryStaff(staffRes.data);
      setDietCharts(dietChartsRes.data);
      setAssignments(assignmentsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/pantry/assign-meal", {
        pantryStaffId: formData.pantryStaffId,
        dietChartId: formData.dietChartId,
        notes: formData.notes,
      });

      const { assignment, generatedDeliveryId } = response.data;
      alert(`Meal assigned successfully! Delivery ID: ${generatedDeliveryId}`);

      // Refresh assignment list
      setAssignments((prevAssignments) => [...prevAssignments, assignment]);
      setFormData({ pantryStaffId: "", dietChartId: "", notes: "" }); // Reset form
      fetchData();
    } catch (error) {
      console.error("Error assigning meal:", error);
      alert("Failed to assign meal. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Assign Meal</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Pantry Staff:</label>
          <select
            name="pantryStaffId"
            value={formData.pantryStaffId}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Pantry Staff</option>
            {pantryStaff.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Diet Chart:</label>
          <select
            name="dietChartId"
            value={formData.dietChartId}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Diet Chart</option>
            {dietCharts.map((chart) => (
              <option key={chart._id} value={chart._id}>
                {chart.MealType} - {chart.patientId?.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any notes here..."
            style={{ ...styles.input, height: "100px" }}
          ></textarea>
        </div>

        <button type="submit" style={styles.button}>
          Assign Meal
        </button>
      </form>

      {/* Assigned Meals Table */}
      <div className="mt-4 overflow-auto max-h-32">
        <h2 style={styles.heading}>Assigned Meals</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Pantry Staff</th>
              <th style={styles.th}>Diet Chart</th>
              <th style={styles.th}>Notes</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Delivery ID</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td style={styles.td}>{assignment.pantryStaffId?.name}</td>
                <td style={styles.td}>
                  {assignment.dietChartId?.MealType} - {assignment.dietChartId?.instructions}
                </td>
                <td style={styles.td}>{assignment.notes}</td>
                <td style={styles.td}>{assignment.status || "Pending"}</td>
                <td style={styles.td}>
                  {assignment.deliveryId ? assignment.deliveryId._id : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
  },
  formGroup: {
    flex: "1 1 calc(50% - 20px)",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    alignSelf: "flex-start",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
  },
};

export default MealAssignmentForm;
