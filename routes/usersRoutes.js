var express = require('express');
var router = express.Router();
var mUsers = require("../Models/usersModel");

/* GET all users */
router.get('/login', async function(req, res, next) {
   let query = req.query;
   let result = await mUsers.login(query.username, query.password);
   res.status(result.status).send(result.data);
});

router.post('/register', async function(req, res, next) {
   let body = req.body;
   let result = await mUsers.register(body);
   res.status(result.status).send(result.data);
});

module.exports = router;
