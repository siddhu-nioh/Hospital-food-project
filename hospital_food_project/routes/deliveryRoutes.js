const express = require("express");
const { getDeliveries, createDelivery, updateDeliveryStatus, deleteDelivery ,assignDelivery} = require("../controllers/deliveryController");


const analyticsController = require("../controllers/analytics");
const router = express.Router();
router.get("/delivery-analytics", analyticsController.getDeliveryAnalytics);
router.get("/", getDeliveries);
router.post("/", createDelivery);
// router.put("/:id", updateDeliveryStatus);
router.delete("/:id", deleteDelivery);
router.put("/assign/:id", assignDelivery);
router.put("/status/:id", updateDeliveryStatus);

module.exports = router;
