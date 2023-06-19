const mongoose = require("mongoose");

const checkpointSchema = new mongoose.Schema({
  name: String,
  placeDescription: String,
  placeLocation: String,
  phoneNumber: String,
  rating: String,
  openingTime: {
    start: Date,
    end: Date,
  },
  planningTime: {
    start: Date,
    end: Date,
  },
  notes: [String],
});

var Checkpoint = mongoose.model("Checkpoint", checkpointSchema);
module.exports = Checkpoint;
