const express = require("express");
const { getDeliveryPersonnel, createDeliveryPersonnel, deleteDeliveryPersonnel } = require("../controllers/deliveryPersonnelController");
const router = express.Router();

router.get("/", getDeliveryPersonnel);
router.post("/", createDeliveryPersonnel);
router.delete("/:id", deleteDeliveryPersonnel);

module.exports = router;
