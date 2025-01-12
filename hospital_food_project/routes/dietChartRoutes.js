const express = require("express");
const { getDietCharts, createDietChart, updateDietChart, deleteDietChart } = require("../controllers/dietChartController");

const router = express.Router();

router.get("/", getDietCharts);
router.post("/", createDietChart);
router.put("/:id", updateDietChart);
router.delete("/:id", deleteDietChart);

module.exports = router;
