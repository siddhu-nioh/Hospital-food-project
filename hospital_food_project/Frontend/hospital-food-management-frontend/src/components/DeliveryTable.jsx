import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa"; // For icons

const DeliveryTable = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  // Fetch deliveries and analytics on component mount
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("https://hospital-food-project-backend.onrender.com/api/deliveries/");
        setDeliveries(response.data);
      } catch (err) {
        console.error("Error fetching deliveries:", err);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("https://hospital-food-project-backend.onrender.com/api/analytics/delivery-analytics");
        setAnalytics(response.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchDeliveries();
    fetchAnalytics();
  }, []);

  // Calculate the number of deliveries made today
  const calculateTodayDeliveries = () => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
    
    const deliveriesToday = deliveries.filter((delivery) => {
      const deliveryDate = new Date(delivery.deliveryTime);
      const deliveryDateStr = deliveryDate.toISOString().split('T')[0];
      return deliveryDateStr === todayDate;  // Compare only the date part
    });

    return deliveriesToday.length;  // Return the count of today's deliveries
  };

  // Update delivery status
  const handleUpdateStatus = async (deliveryId, newStatus) => {
    try {
      const response = await axios.put(`https://hospital-food-project-backend.onrender.com/api/deliveries/status/${deliveryId}`, {
        status: newStatus,
      });
      alert(response.data.message); // Notify on success
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) =>
          delivery._id === deliveryId
            ? { ...delivery, status: newStatus, deliveryTime: newStatus === "Delivered" ? new Date() : delivery.deliveryTime }
            : delivery
        )
      );
    } catch (err) {
      console.error("Error updating delivery status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div>
      <div className="flex space-x-6 mb-6">
        {/* Analytics Box */}
        <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg shadow-md w-64">
          <div className="text-center">
            <FaCalendarAlt size={32} className="text-blue-500 mb-2" />
            <p className="text-lg font-semibold">Meals Delivered Today</p>
            <div className="mt-2">
              <p className="text-xl font-bold text-blue-700">{calculateTodayDeliveries()} meals</p>
            </div>
          </div>
        </div>

        {/* Add more boxes for other analytics like total deliveries, etc. */}
      </div>

      {/* Delivery Table */}
      <h2 className="text-2xl font-bold mb-4">Delivery List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Patient</th>
            <th className="border px-4 py-2">Meal</th>
            <th className="border px-4 py-2">Delivery Personnel</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Delivery Time</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td className="border px-4 py-2">
                {delivery.patientId?.name || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {delivery.dietChartId?.MealType || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {delivery.deliveryPersonnelId?.name || "N/A"}
              </td>
              <td className="border px-4 py-2">{delivery.status}</td>
              <td className="border px-4 py-2">
                {delivery.deliveryTime
                  ? new Date(delivery.deliveryTime).toLocaleString()
                  : "N/A"}
              </td>
              <td className="border px-4 py-2">
                <select
                  value={delivery.status}
                  onChange={(e) =>
                    handleUpdateStatus(delivery._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTable;
