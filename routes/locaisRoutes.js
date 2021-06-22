var express = require('express');
var router = express.Router();
var mLocais = require("../Models/locaisModel");

/* GET all locais */
router.get('/', async function(req, res, next) {
    let result = await mLocais.getLocais();
    res.status(result.status).send(result.data);
 });

router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    let result = await mLocais.getLocal(id);
    res.status(result.status).send(result.data);
 });

module.exports = router;
