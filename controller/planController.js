const planService = require("../service/planService");
const checkpointService = require("../service/checkpointService");
module.exports = {
  createPlan: (req, res, next) => {
    planService
      .createPlan(req.body)
      .then((result) => {
        console.log(result);
        res.status(200).json("Created: " + result._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  getPlan: (req, res, next) => {
    planService
      .getPlan(req.params.planId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  editPlan: (req, res, next) => {
    planService
      .editPlan(req.params.planId, req.body)
      .then((result) => {
        res.status(200).json("Edited: " + result._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  changeSchedule: async (req, res, next) => {
    const planId = req.params.planId;
    let currentPlant;
    let resultIds = [];
    let promises = [];

    await planService.getPlan(planId).then((plan) => {
      currentPlant = plan;
    });

    await currentPlant.schedule.forEach((day) => {
      checkpointService.deleteCheckpoints(day);
    });

    for (const day of req.body) {
      await promises.push(
        checkpointService.createMany(day).then((result) => {
          let idArray = [];
          result.forEach((checkpoint) => {
            idArray.push(checkpoint._id);
          });
          resultIds.push(idArray);
        })
      );
    }
    await Promise.all(promises).then(() => {
      planService
        .editPlan(planId, {
          schedule: resultIds,
        })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json("Error: " + err);
        });
    });
  },
  getSchedule: async (req, res, next) => {
    console.log("Receive: " + req.params.planId);
    const planId = req.params.planId;
    let currentPlant;
    let results = [];
    let promises = [];

    await planService.getPlan(planId).then((plan) => {
      currentPlant = plan;
    });

    for (const day of currentPlant.schedule) {
      await promises.push(
        checkpointService.findMany(day).then((result) => {
          results.push(result);
        })
      );
    }
    await Promise.all(promises).then(() => {
      res.status(200).json(results);
    });
    res.status(200).json("Get schedule");
  },
  getAllPlan: (req, res, next) => {
    planService
      .getAllPlan()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
};
