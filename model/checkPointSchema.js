const mongoose = require("mongoose");

const checkPointSchema = new mongoose.Schema({
  name: { type: String },
  placeDescription: String,
  placeLocation: String,
  phoneNumber: String,
  rating: String,
  openingTime: {
    start: { type: Date },
    end: { type: Date },
  },
  planningTime: {
    start: { type: Date },
    end: { type: Date },
  },
});

var CheckPoint = mongoose.model("CheckPoint", checkPointSchema);
module.exports = CheckPoint;