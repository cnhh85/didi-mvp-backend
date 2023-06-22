const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router
  .post("/", (req, res, next) => {
    userController.createUser(req, res, next);
  })
  .post("/auth", (req, res, next) => {
    userController.authUser(req, res, next);
  })
  .put("/:userId", (req, res, next) => {
    userController.editUser(req, res, next);
  })
  .get("/:userId", (req, res, next) => {
    userController.getUser(req, res, next);
  })
  .post("/:userId/changePlanList", (req, res, next) => {
    userController.changePlanList(req, res, next);
  })
  .post("/:userId/upgradeToPremium", (req, res, next) => {
    userController.upgradeToPremium(req, res, next);
  });

module.exports = router;
