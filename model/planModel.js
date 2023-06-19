const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  location: String,
  planDescription: String,
  imageUrl: String,
  schedule: [[{ type: mongoose.Schema.Types.ObjectId }]],
});

var Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
