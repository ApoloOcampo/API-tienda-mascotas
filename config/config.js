const mysql = require('mysql');

var connection;

connection = mysql.createConnection({
    host: '138.128.182.130',
    user: 'wan723_admin_animales',
    password: 'Animales123.,',
    database: 'wan723_animales',
    port: 3306
});

connection.connect(function(err) {
    if (err) console.log(err);
});
    
module.exports = connection;  