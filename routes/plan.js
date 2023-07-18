const express = require('express');
const router = express.Router();

const planController = require('../controller/planController');

router
  .post('/', (req, res, next) => {
    planController.createPlan(req, res, next);
  })
  .put('/:planId', (req, res, next) => {
    planController.editPlan(req, res, next);
  })
  .get('/:planId', (req, res, next) => {
    planController.getPlan(req, res, next);
  })
  .post('/:planId/changeSchedule', (req, res, next) => {
    planController.changeSchedule(req, res, next);
  })
  .post('/:planId/addAttraction', (req, res, next) => {
    planController.createAndAddAttractionToSchedule(req, res, next);
  })
  .get('/:planId/getSchedule', (req, res, next) => {
    planController.getSchedule(req, res, next);
  })
  .get('/user/:userId', (req, res, next) => {
    planController.getAllPlanFromUser(req, res, next);
  })
  .get('/', (req, res, next) => {
    planController.getAllPlan(req, res, next);
  })
  .delete('/:planId', planController.delete);

module.exports = router;
