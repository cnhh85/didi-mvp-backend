const UserModel = require("../model/userModel");

module.exports = {
  createUser: (data) => {
    const userModel = new UserModel(data);
    return userModel.save();
  },
  getUser: (id) => {
    return UserModel.findById(id);
  },
  editUser: (id, data) => {
    return UserModel.findByIdAndUpdate(id, data);
  },
  getAllUser: () => {
    return UserModel.find();
  },
};
