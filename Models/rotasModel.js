var pool = require("./connection");

module.exports.newRota = async function(body) {
    try {

        let sql = "INSERT INTO rotas(rota_name, rota_description, rota_creator_id, rota_creation_date) VALUES(?,?,?,?)";
        let result = await pool.query(sql, [body.rota_name, body.rota_description, body.rota_creator_id, body.rota_creation_date]);
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