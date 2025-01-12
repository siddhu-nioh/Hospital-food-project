const mongoose = require("mongoose");

const mealAssignmentSchema = new mongoose.Schema({
  pantryStaffId: { type: mongoose.Schema.Types.ObjectId, ref: "PantryStaff", required: true },
  dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: "DietChart", required: true },
  preparationStatus: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: "Delivery", required: true },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("MealAssignment", mealAssignmentSchema);
