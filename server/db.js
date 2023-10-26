const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'lemontree.cafe24app.com',
    user : 'lt123',
    password : 'lttest123',
    database : 'lt123'
});

module.exports = connection;