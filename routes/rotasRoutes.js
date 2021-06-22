var express = require('express');
var router = express.Router();
var mRotas = require("../Models/rotasModel");

/* ADD new rota */
router.post('/new', async function(req, res, next) {
    let body = req.body;
    let result = await mRotas.newRota(body);
    res.status(result.status).send(result.data);
});

router.post('/:id/newLocal', async function(req, res, next) {
    let id = req.params.id;
    let body = req.body;
    body.rotaId = id;
    let result = await mRotas.newLocalRota(body);
    res.status(result.status).send(result.data);
});

router.get('/', async function(req, res, next) {
    let result = await mRotas.getRotas();
    res.status(result.status).send(result.data);
 });

router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    let result = await mRotas.getRota(id);
    res.status(result.status).send(result.data);
});

module.exports = router;
