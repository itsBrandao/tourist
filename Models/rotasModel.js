var pool = require("./connection");

module.exports.getRotas = async function() {
    try {

        let sql = "SELECT * FROM rotas";
        let result = await pool.query(sql);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

module.exports.getRota = async function(id) {
    try {

        let sql = "SELECT * FROM rotas WHERE rota_id = ?";
        let result = await pool.query(sql, [id]);
        sql = "SELECT * FROM locaisRota R, locais L WHERE R.local_rota_id = ? AND L.local_id = R.local_id";
        let locais = await pool.query(sql, [id]);
        result[0].locais = locais;
        return {status: 200, data: result[0]};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

module.exports.newRota = async function(body) {
    try {

        let sql = "INSERT INTO rotas(rota_name, rota_description, rota_creator_id) VALUES(?,?,?)";
        let result = await pool.query(sql, [body.rota_name, body.rota_description, body.rota_creator_id]);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

module.exports.newLocalRota = async function(body) {
    try {

        let sql = "INSERT INTO locaisRota(local_id, local_rota_id) VALUES(?,?)";
        let result = await pool.query(sql, [body.local_id, body.local_rota_id]);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};