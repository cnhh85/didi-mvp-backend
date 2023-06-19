const PlanModel = require("../model/planModel");

module.exports = {
  createPlan: (data) => {
    const planModel = new PlanModel(data);
    return planModel.save();
  },
  getPlan: (id) => {
    return PlanModel.findById(id);
  },
  editPlan: (id, data) => {
    return PlanModel.findByIdAndUpdate(id, data);
  },
};
