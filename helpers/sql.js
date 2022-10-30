const mysql = require("mysql2")

let SCHEMAS = {

};

const sql = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
}).promise();


module.exports = {
    sql,
    //dynSql
}
