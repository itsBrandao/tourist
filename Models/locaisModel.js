var pool = require("./connection");

module.exports.getLocais = async function() {
    try {

        let sql = "SELECT * FROM locais";
        let result = await pool.query(sql);
        if (result.length > 0) {
            return {status: 200, data: result};
        } else {
            return {status: 404, data: {msg: "Sem locais!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

module.exports.getLocal = async function(id) {
    try {

        let sql = "SELECT * FROM locais WHERE local_id = ?";
        let result = await pool.query(sql, [id]);
        if (result.length > 0) {
            return {status: 200, data: result[0]};
        } else {
            return {status: 404, data: {msg: "Sem locais!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};
