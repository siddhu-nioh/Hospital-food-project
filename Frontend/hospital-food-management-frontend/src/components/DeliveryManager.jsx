import React, { useState, useEffect } from "react";
import { getDeliveries, createDelivery, updateDeliveryStatus, deleteDelivery } from "../api/api";

const DeliveryManager = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    dietChartId: "",
    deliveryPersonnelId: "",
    status: "Pending",
    notes: "",
  });

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    const { data } = await getDeliveries();
    setDeliveries(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updateDeliveryStatus(form.id, form);
    } else {
      await createDelivery(form);
    }
    setForm({ patientId: "", dietChartId: "", deliveryPersonnelId: "", status: "Pending", notes: "" });
    loadDeliveries();
  };

  const handleEdit = (delivery) => {
    setForm(delivery);
  };

  const handleDelete = async (id) => {
    await deleteDelivery(id);
    loadDeliveries();
  };

  return (
    <div>
      <h2>Delivery Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient ID"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Diet Chart ID"
          value={form.dietChartId}
          onChange={(e) => setForm({ ...form, dietChartId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Delivery Personnel ID"
          value={form.deliveryPersonnelId}
          onChange={(e) => setForm({ ...form, deliveryPersonnelId: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button type="submit">{form.id ? "Update" : "Create"} Delivery</button>
      </form>

      <h3>Delivery List</h3>
      <ul>
        {deliveries.map((delivery) => (
          <li key={delivery._id}>
            {delivery.status} - {delivery.notes}
            <button onClick={() => handleEdit(delivery)}>Edit</button>
            <button onClick={() => handleDelete(delivery._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryManager;
