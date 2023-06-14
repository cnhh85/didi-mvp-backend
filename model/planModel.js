const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  location: String,
  planDescription: String,
  imageUrl: String,
});

var Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
