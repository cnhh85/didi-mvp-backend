const Checkpoint = require("../model/checkpointSchema");

module.exports = {
  createCheckpoint: (req, res) => {
    let body = {
      name: String,
      placeDescription: String,
      placeLocation: String,
      phoneNumber: String,
      rating: String,
      openingTime: { start: Date, end: Date },
      planningTime: { start: Date, end: Date },
      plan: { type: ObjectId },
    };
    const checkpoint = Checkpoint(req.body);
    checkpoint.then(() => {
      res.status(200).json(checkpoint);
    });
  },
};
