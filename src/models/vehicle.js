const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
