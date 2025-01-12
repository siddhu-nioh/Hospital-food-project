const Delivery = require("../models/Delivery");

exports.getDeliveryAnalytics = async (req, res) => {
  try {
    // Aggregate meals delivered per day
    const deliveryStats = await Delivery.aggregate([
      {
        $match: { status: "Delivered" },  // Only consider delivered meals
      },
      {
        $project: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$deliveryTime" } },  // Format deliveryTime to day (yyyy-mm-dd)
        },
      },
      {
        $group: {
          _id: "$day",  // Group by the day
          totalDelivered: { $sum: 1 },  // Count the number of deliveries per day
        },
      },
      {
        $sort: { _id: -1 },  // Sort by most recent day first
      },
    ]);

    res.status(200).json(deliveryStats);
  } catch (error) {
    console.error("Error fetching delivery analytics:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
