const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: "DietChart", required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Delivered"], default: "Pending" },
  deliveryPersonnelId: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPersonnel" },
  deliveryTime: { type: Date },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("Delivery", deliverySchema);
