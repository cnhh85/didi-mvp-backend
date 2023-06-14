const Checkpoint = require("../model/checkpointSchema");

module.exports = {
  createCheckpoint: ({
    name: String,
    placeDescription: String,
    placeLocation: String,
    phoneNumber: String,
    rating: String,
    openingTime: { start: Date, end: Date },
    planningTime: { start: Date, end: Date },
    plan: { type: ObjectId },
  }) => {},
};
