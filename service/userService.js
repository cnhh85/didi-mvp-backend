const UserModel = require('../model/userModel');

module.exports = {
  createUser: (data) => {
    const userModel = new UserModel(data);
    return userModel.save();
  },
  getUser: (id) => {
    return UserModel.findById(id);
  },
  editUser: async (id, data) => {
    await UserModel.findByIdAndUpdate(id, data);
    const newUser = await UserModel.findById(id);
    return newUser;
  },
  getAllUser: () => {
    return UserModel.find();
  },
  authUser: async (email, password) => {
    const promise = await UserModel.findOne({
      email: email,
      password: password,
    }).exec();
    // console.log(promise)
    return promise;
  },
  updateUserAfterDeletingPlan: async (planId, userId) => {
    const user = await UserModel.findById(userId);
    if (user && user.plans) {
      const index = user.plans.indexOf(planId);
      user.plans.splice(index, 1);
      await user.save();
    }
  },
};
