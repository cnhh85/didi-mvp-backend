const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

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
  plan: ObjectId,
});

var Checkpoint = mongoose.model("Checkpoint", checkpointSchema);
module.exports = Checkpoint;
