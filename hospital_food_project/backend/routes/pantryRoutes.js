const express = require("express");
const { assignMeal, updatePreparationStatus, listAssignments,assignToDeliveryPersonnel, getAvailableAssignments } = require("../controllers/pantryController");
const router = express.Router();
const PantryStaff = require("../models/PantryStaff");
// Assign a meal preparation and delivery
router.post("/assign-meal", assignMeal);

// Update the preparation status of a meal
router.put("/update-status/:assignmentId", updatePreparationStatus);

// List all assignments
router.get("/assignments", listAssignments);
router.get("/assignments/unassigned",getAvailableAssignments)
router.post("/assign-to-delivery-personnel", assignToDeliveryPersonnel);
router.get("/pantryStaff", async (req, res) => {
    try {
      const pantryStaffList = await PantryStaff.find();
      res.status(200).json(pantryStaffList);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
router.post("/pantryStaff", async (req, res) => {
    try {
      const { name, contactInfo, location } = req.body;
  
      if (!name || !contactInfo || !location) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newPantryStaff = new PantryStaff({ name, contactInfo, location });
      await newPantryStaff.save();
  
      res.status(201).json({ message: "Pantry staff added successfully", pantryStaff: newPantryStaff });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  router.put("/pantryStaff/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, contactInfo, location } = req.body;
  
      if (!name || !contactInfo || !location) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const updatedPantryStaff = await PantryStaff.findByIdAndUpdate(
        id,
        { name, contactInfo, location },
        { new: true }
      );
  
      if (!updatedPantryStaff) {
        return res.status(404).json({ error: "Pantry staff not found" });
      }
  
      res.status(200).json({ message: "Pantry staff updated successfully", pantryStaff: updatedPantryStaff });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Delete Pantry Staff
  router.delete("/pantryStaff/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedPantryStaff = await PantryStaff.findByIdAndDelete(id);
  
      if (!deletedPantryStaff) {
        return res.status(404).json({ error: "Pantry staff not found" });
      }
  
      res.status(200).json({ message: "Pantry staff deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

module.exports = router;