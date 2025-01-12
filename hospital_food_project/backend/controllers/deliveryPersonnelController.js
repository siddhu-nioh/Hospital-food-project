const DeliveryPersonnel = require("../models/DeliveryPersonnel");

// Get all delivery personnel
exports.getDeliveryPersonnel = async (req, res) => {
  try {
    const personnel = await DeliveryPersonnel.find();
    res.status(200).json(personnel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new delivery personnel
exports.createDeliveryPersonnel = async (req, res) => {
  try {
    const newPersonnel = new DeliveryPersonnel(req.body);
    await newPersonnel.save();
    res.status(201).json(newPersonnel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a delivery personnel
exports.deleteDeliveryPersonnel = async (req, res) => {
  try {
    await DeliveryPersonnel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delivery personnel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
