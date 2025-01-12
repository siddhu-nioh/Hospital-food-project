const Patient = require("../models/patient");

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing patient by ID
exports.updatePatient = async (req, res) => {
  const { id } = req.params;  // Get the patient ID from the URL parameters
  const updatedData = req.body;  // Get the updated data from the request body

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(updatedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
  const { id } = req.params;  // Get the patient ID from the URL parameters

  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
