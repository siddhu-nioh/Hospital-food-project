import React, { useState, useEffect } from "react";
import axios from "axios";

const DeliveryPortal = () => {
  const [assignedDeliveries, setAssignedDeliveries] = useState([]);

  const fetchAssignedDeliveries = async () => {
    const response = await axios.get("/api/deliveries");
    setAssignedDeliveries(response.data.filter((delivery) => delivery.status !== "Delivered"));
  };

  useEffect(() => {
    fetchAssignedDeliveries();
  }, []);

  const handleMarkAsDelivered = async (id) => {
    await axios.put(`/api/deliveries/status/${id}`, { status: "Delivered" });
    fetchAssignedDeliveries();
  };

  return (
    <div>
      <h2>Delivery Personnel Portal</h2>
      <ul>
        {assignedDeliveries.map((delivery) => (
          <li key={delivery._id}>
            Patient: {delivery.patientId} - Status: {delivery.status}
            <button onClick={() => handleMarkAsDelivered(delivery._id)}>Mark as Delivered</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryPortal;
