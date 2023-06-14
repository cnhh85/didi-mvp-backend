var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json('this is /plan');
});

module.exports = router;
