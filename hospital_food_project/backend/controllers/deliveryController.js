const Delivery = require("../models/Delivery");

// Get all deliveries
exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate("patientId dietChartId deliveryPersonnelId");
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new delivery
exports.createDelivery = async (req, res) => {
  try {
    const newDelivery = new Delivery(req.body);
    await newDelivery.save();
    res.status(201).json(newDelivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update delivery status
// exports.updateDeliveryStatus = async (req, res) => {
//   try {
//     const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedDelivery);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Delete a delivery
exports.deleteDelivery = async (req, res) => {
  try {
    await Delivery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delivery deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// const Delivery = require("../models/Delivery");

// Assign a delivery to a personnel
exports.assignDelivery = async (req, res) => {
  try {
    const { deliveryPersonnelId } = req.body;

    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery not found" });

    delivery.deliveryPersonnelId = deliveryPersonnelId;
    delivery.status = "In Progress";
    await delivery.save();

    res.status(200).json({ message: "Delivery assigned successfully", delivery });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update delivery status by delivery personnel
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (!["Pending", "In Progress", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery not found" });
    if (status === "Delivered" && !delivery.deliveryTime) {
      delivery.deliveryTime = new Date(); // Set the current date and time
    }
    delivery.status = status;
    delivery.notes = notes || delivery.notes;
    delivery.deliveryTime = new Date();
    await delivery.save();

    res.status(200).json({ message: "Delivery status updated successfully", delivery });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
