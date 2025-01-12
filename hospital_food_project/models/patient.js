const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contactInfo: String,
  emergencyContact: String,
  roomNumber: String,
  bedNumber: String,
  floorNumber: String,
  diseases: [String],
  allergies: [String],
});

module.exports = mongoose.model("Patient", PatientSchema);
