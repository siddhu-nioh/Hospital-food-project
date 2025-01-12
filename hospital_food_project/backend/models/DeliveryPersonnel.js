const mongoose = require("mongoose");

const deliveryPersonnelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
});

module.exports = mongoose.model("DeliveryPersonnel", deliveryPersonnelSchema);
