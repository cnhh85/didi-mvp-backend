const express = require('express');
const checkpointController = require('../controller/checkpointController');
const attractionRouter = express.Router();

attractionRouter
  .get('/', checkpointController.getAll)
  .get('/:attractionId', checkpointController.getAttraction)
  .put('/:attractionId', checkpointController.update)
  .delete('/:attractionId', checkpointController.delete);

module.exports = attractionRouter;
