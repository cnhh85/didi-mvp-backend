const PlanModel = require('../model/planModel');
const UserModel = require('../model/userModel');
const CheckpointModel = require('../model/checkpointModel');
const checkpointService = require('../service/checkpointService');

module.exports = {
  createPlan: (data) => {
    const planModel = new PlanModel(data);
    const diff =
      (new Date(planModel?.endDate) - new Date(planModel?.startDate)) /
        (1000 * 60 * 60 * 24) +
      1;
    planModel.schedule = Array(diff).fill([]);
    // console.log(diff, planModel);
    return planModel.save();
  },
  getPlan: async (id) => {
    let resultPlan = {};
    const schedule = [];
    const plan = await PlanModel.findById(id);
    if (plan.schedule.length > 0) {
      for (const day of plan.schedule) {
        const result = await checkpointService.findMany(day);
        schedule.push(result);
      }
    }

    resultPlan = { ...plan._doc, schedule: schedule };
    return resultPlan;
  },
  editPlan: (id, data) => {
    return PlanModel.findByIdAndUpdate(id, data);
  },
  getAllPlan: () => {
    return PlanModel.find();
  },
  getAllPlanFromUser: async (id) => {
    const response = await UserModel.findById(id);
    // console.log(response);
    const plans = [];
    let index = 0;
    if (response.plans.length > 0) {
      for (const planId of response.plans) {
        let resultPlan = {};
        const schedule = [];
        const plan = await PlanModel.findById(planId);

        if (plan.schedule.length > 0) {
          for (const day of plan.schedule) {
            const result = await checkpointService.findMany(day);
            schedule.push(result);
          }
        }

        resultPlan = { ...plan._doc, schedule: schedule };
        plans.push(resultPlan);
      }
    }
    return plans;
  },
  createAndAddAttractionToSchedule: async (planId, attraction, dayIndex) => {
    const attractionInDb = await CheckpointModel.create(attraction);
    const plan = await PlanModel.findById(planId);
    if (plan && plan.schedule && dayIndex < plan.schedule.length) {
      plan.schedule[dayIndex].push(attractionInDb);
      await plan.save();
    }
    return plan;
  },
  updateScheduleAfterDeletingAttraction: async (
    attractionId,
    planId,
    dayIndex
  ) => {
    const plan = await PlanModel.findById(planId);
    if (plan && plan.schedule && plan.schedule[dayIndex]) {
      const index = plan.schedule[dayIndex].indexOf(attractionId);
      plan.schedule[dayIndex].splice(index, 1);
      await plan.save();
    }
  },
  deleteOne: async (id) => {
    return PlanModel.deleteOne({ _id: id });
  },
};
