var pool = require("./connection");

module.exports.login = async function(name, password) {
    try {

        let sql = "SELECT user_id, user_name, user_gender, DATE_FORMAT(user_birthday, '%d-%m-%y') AS user_birthday, user_email, user_password FROM users WHERE user_name = ?";
        let result = await pool.query(sql, [name]);

        if (result.length > 0) {
            if (password == result[0].user_password) {
                return {status: 200, data: result[0]};
            }
            else {
                return {status: 404, data: {msg: "Password incorreta!"}};
            }
        }
        else {
            return {status: 404, data: {msg: "Este utilizador nao existe!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

module.exports.register = async function(body) {
    try {

        let sql = "INSERT INTO users(user_name, user_gender, user_birthday, user_email, user_password) VALUES(?,?,?,?,?)";
        let result = await pool.query(sql, [body.username, body.gender, body.birthday, body.email, body.password]);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

module.exports.getUserRotas = async function(id) {
    try {

        let sql = "SELECT * FROM rotas WHERE rota_creator_id = ?";
        let result = await pool.query(sql, [id]);
        return {status: 200, data: result};

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};