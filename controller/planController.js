const PlanModel = require("../model/planModel");
module.exports = {
  createPlan: (req, res, next) => {
    console.log("Receive: " + req.body.name);
    const planModel = new PlanModel(req.body);
    res.status(200).json("Created");
  },
  getPlan: (req, res, next) => {
    console.log("Receive: " + req.params.planId);
    res.status(200).json("Get");
  },
  editPlan: (req, res, next) => {
    console.log("Receive: " + req.params.planId);
    console.log("Receive: " + req.body.name);
    res.status(200).json("Edited");
  },
  changeSchedule: (req, res, next) => {
    console.log("Receive: " + req.params.planId);
    console.log("Receive: " + req.body.name);
    res.status(200).json("Added");
  },
  getSchedule: (req, res, next) => {
    console.log("Receive: " + req.params.planId);
    res.status(200).json("Get schedule");
  },
  getAllPlan: (req, res, next) => {
    res.status(200).json("Get all");
  },
};
