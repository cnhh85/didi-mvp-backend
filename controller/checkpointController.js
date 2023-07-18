const Checkpoint = require('../model/checkpointModel');
const checkpointService = require('../service/checkpointService');
const planService = require('../service/planService');

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
  getAttraction: async (req, res, next) => {
    try {
      const { attractionId } = req.params;
      const data = await checkpointService.findOne(attractionId);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  getAll: async (req, res, next) => {
    try {
      const data = await checkpointService.findAll();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res, next) => {
    try {
      const { attractionId } = req.params;
      const data = await checkpointService.updateOne(attractionId, req.body);
      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res, next) => {
    try {
      const { attractionId } = req.params;
      const { planId, dayIndex } = req.body;
      const data = await checkpointService.deleteOne(attractionId);
      await planService.updateScheduleAfterDeletingAttraction(
        attractionId,
        planId,
        dayIndex
      );
      res.status(200).json({ isSuccessfully: true, planId: planId });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
};
