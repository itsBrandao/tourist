var pool = require('./connection');


module.exports.getUser = async function(username, password) {
    try {

        let sql = "SELECT * FROM users WHERE user_name = ? AND user_password";
        let result = await pool.query(sql, [username, password]);

        if (result.length > 0) {
            return {status: 200, data: result[0]};
        }
        else {
            return {status: 404, data: {msg: "Utilizador invalido!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
};

