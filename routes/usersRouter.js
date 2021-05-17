var express = require('express');
var router = express.Router();
var usersModel = require('../Models/usersModel');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  let user = req.query;
  let result = await usersModel.getUser(user.name, user.password)
  res.status(result.status).send(result.data);
});

module.exports = router;
