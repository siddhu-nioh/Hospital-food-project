const DietChart = require("../models/DietChart");

// Get all diet charts
exports.getDietCharts = async (req, res) => {
  try {
    const charts = await DietChart.find().populate("patientId");
    res.status(200).json(charts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new diet chart
exports.createDietChart = async (req, res) => {
  try {
    const newChart = new DietChart(req.body);
    await newChart.save();
    res.status(201).json(newChart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a diet chart
exports.updateDietChart = async (req, res) => {
  try {
    const updatedChart = await DietChart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedChart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a diet chart
exports.deleteDietChart = async (req, res) => {
  try {
    await DietChart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Diet chart deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
