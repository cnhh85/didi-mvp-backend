const CheckpointModel = require("../model/checkpointModel");

module.exports = {
  deleteCheckpoints: (ids) => {
    return CheckpointModel.deleteMany({ _id: { $in: ids } });
  },
  createMany: (checkpoints) => {
    let checkpointModels = [];
    checkpoints.forEach((checkpoint) => {
      checkpointModels.push(new CheckpointModel(checkpoint));
    });
    return CheckpointModel.create(checkpointModels);
  },
  findMany: (ids) => {
    return CheckpointModel.find({ _id: { $in: ids } });
  },
};
