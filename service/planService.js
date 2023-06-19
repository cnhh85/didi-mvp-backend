const PlanModel = require("../model/planModel");

module.exports = {
  createPlan: (data) => {
    const planModel = new PlanModel(data);
    return planModel.save();
  },
};
