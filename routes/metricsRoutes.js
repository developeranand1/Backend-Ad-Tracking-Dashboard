const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metricsController");

router.get("/", metricsController.getMetrics);
router.post("/", metricsController.addMetric);

module.exports = router;