import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");

  const fetchData = async () => {
    const [deliveriesRes, personnelRes] = await Promise.all([
      axios.get("/api/deliveries"),
      axios.get("/api/delivery-personnel"),
    ]);    setDeliveries(deliveriesRes.data);
    setPersonnel(personnelRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async () => {
    await axios.put(`/api/deliveries/assign/${selectedDelivery}`, {
      deliveryPersonnelId: selectedPersonnel,
    });
    fetchData();
  };

  return (
    <div>
      <h2>Assign Deliveries</h2>
      <select onChange={(e) => setSelectedDelivery(e.target.value)} defaultValue="">
        <option value="" disabled>Select a Delivery</option>
        {deliveries.map((delivery) => (
          <option key={delivery._id} value={delivery._id}>
            {delivery.patientId} - {delivery.status}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSelectedPersonnel(e.target.value)} defaultValue="">
        <option value="" disabled>Select a Personnel</option>
        {personnel.map((person) => (
          <option key={person._id} value={person._id}>
            {person.name}
          </option>
        ))}
      </select>

      <button onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default AssignDeliveries;
