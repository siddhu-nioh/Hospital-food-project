const Delivery = require("../models/Delivery");
const MealAssignment = require("../models/MealAssignment");
const DietChart = require("../models/DietChart"); // Ensure this is imported
// const MealAssignment = require("../models/MealAssignment");
// const Delivery = require("../models/Delivery");
const DeliveryPersonnel = require("../models/DeliveryPersonnel");

// Assign completed meals to delivery personnel
exports.assignToDeliveryPersonnel = async (req, res) => {
  try {
    const { assignmentId, deliveryPersonnelId } = req.body;

    // Validate input
    if (!assignmentId || !deliveryPersonnelId) {
      return res.status(400).json({ message: "Assignment ID and Delivery Personnel ID are required." });
    }

    // Fetch the meal assignment and check status
    const assignment = await MealAssignment.findById(assignmentId).populate("deliveryId");
    if (!assignment) {
      return res.status(404).json({ message: "Meal assignment not found." });
    }

    if (assignment.preparationStatus !== "Completed") {
      return res.status(400).json({ message: "Meal assignment must be completed before assigning to delivery personnel." });
    }

    // Update the delivery with the personnel details
    const delivery = await Delivery.findById(assignment.deliveryId._id);
    if (!delivery) {
      return res.status(404).json({ message: "Associated delivery not found." });
    }

    delivery.deliveryPersonnelId = deliveryPersonnelId;
    delivery.status = "In Progress";
    await delivery.save();

    res.status(200).json({ message: "Delivery assigned to personnel successfully.", delivery });
  } catch (error) {
    console.error("Error assigning delivery:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Assign a meal
exports.assignMeal = async (req, res) => {
  try {
    const { pantryStaffId, dietChartId, notes } = req.body;

    if (!pantryStaffId || !dietChartId) {
      return res.status(400).json({ message: "Pantry Staff ID and Diet Chart ID are required." });
    }

    // Find diet chart (and ensure patientId is populated)
    const dietChart = await DietChart.findById(dietChartId).populate("patientId");
    if (!dietChart) {
      return res.status(404).json({ message: "Diet Chart not found." });
    }

    // Create a delivery and include dietChartId
    const delivery = new Delivery({
      patientId: dietChart.patientId._id, // Ensure this is set
      status: "Pending",
      dietChartId: dietChartId, // This is the key fix
    });
    await delivery.save();

    // Create a meal assignment
    const mealAssignment = new MealAssignment({
      pantryStaffId,
      dietChartId,
      deliveryId: delivery._id, // Link the created delivery
      notes,
    });
    await mealAssignment.save();

    res.status(201).json({
      message: "Meal assigned successfully.",
      assignment: mealAssignment,
      generatedDeliveryId: delivery._id,
    });
  } catch (error) {
    console.error("Error assigning meal:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update preparation status of a meal
// Update preparation status and notes of a meal
exports.updatePreparationStatus = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { preparationStatus, notes } = req.body;

    // Validate preparation status
    if (preparationStatus && !["Pending", "In Progress", "Completed"].includes(preparationStatus)) {
      return res.status(400).json({ error: "Invalid preparation status" });
    }

    // Find the meal assignment
    const assignment = await MealAssignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Update fields if provided
    if (preparationStatus) {
      assignment.preparationStatus = preparationStatus;
    }
    if (notes !== undefined) {
      assignment.notes = notes;
    }

    // Save updated assignment
    await assignment.save();

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment,
    });
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


// List all meal assignments
exports.listAssignments = async (req, res) => {
  try {
    const assignments = await MealAssignment.find()
      .populate("pantryStaffId", "name contactInfo")  // Populate pantry staff details
      .populate("dietChartId", "MealType instructions ingredients")  // Populate diet chart details
      .populate("deliveryId", "status deliveryTime");  // Populate delivery info

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error listing assignments:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


// New route to get available completed meal assignments (not yet assigned to delivery personnel)
// New route to get available completed meal assignments (not yet assigned to delivery personnel)
exports.getAvailableAssignments = async (req, res) => {
  try {
    // Step 1: Get all completed deliveries with assigned personnel (to exclude these)
    const assignedDeliveries = await Delivery.find({
      status: "In Progress", // Ensure the delivery is in progress
      deliveryPersonnelId: { $exists: true }, // Ensure it is assigned to a personnel
    }).select("dietChartId");  // Get only the dietChartId to use in filtering

    const assignedDietChartIds = assignedDeliveries.map((delivery) => delivery.dietChartId.toString());

    // Step 2: Fetch completed meal assignments (not yet assigned to personnel)
    const availableAssignments = await MealAssignment.find({
      preparationStatus: "Completed",  // Ensure the meal is completed
      deliveryPersonnelId: { $exists: false },  // Ensure the meal is not assigned yet
    })
      .populate("pantryStaffId", "name contactInfo")  // Populate pantry staff details
      .populate("dietChartId", "MealType instructions ingredients");  // Populate diet chart details

    // Step 3: Filter out assignments whose dietChartId is already assigned in the delivery collection
    const filteredAssignments = availableAssignments.filter((assignment) => {
      return !assignedDietChartIds.includes(assignment.dietChartId._id.toString());
    });

    // Step 4: Return the filtered list of available assignments
    if (filteredAssignments.length === 0) {
      return res.status(404).json({ message: "No available assignments found." });
    }

    res.status(200).json(filteredAssignments);
  } catch (error) {
    console.error("Error fetching available assignments:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
