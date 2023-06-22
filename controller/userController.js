const userService = require("../service/userService");
module.exports = {
  createUser: (req, res, next) => {
    userService
      .createUser(req.body)
      .then((result) => {
        console.log(result);
        res.status(200).json("Created: " + result._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  getUser: (req, res, next) => {
    userService
      .getUser(req.params.userId)
      .then((result) => {
        result.password = undefined;
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  editUser: (req, res, next) => {
    const { password, ...data } = req.body;
    userService
      .editUser(req.params.userId, data)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  authUser: (req, res, next) => {
    userService
      .authUser(req.body.email, req.body.password)
      .then((result) => {
        result.password = undefined;
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  changePlanList: (req, res, next) => {
    userService
      .editUser(req.params.userId, { plans: req.body })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
  upgradeToPremium: (req, res, next) => {
    userService
      .editUser(req.params.userId, { isPremium: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error: " + err);
      });
  },
};
