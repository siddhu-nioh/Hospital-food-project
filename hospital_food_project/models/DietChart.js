const mongoose = require("mongoose");
const DietChartSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  instructions: String,
  MealType: { 
    type: String, 
    enum: ["Morning Meals", "Evening Meals", "Night Meals"], 
    default: "Morning Meals" 
  },
  ingredients: [String],
  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Delivered"], 
    default: "Pending" 
  },
});

module.exports = mongoose.model("DietChart", DietChartSchema);
