const mysql = require('mysql');
const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'qwerty12',
    database: 'uit_seminar',
    multipleStatements: true
};
const db = mysql.createConnection(db_config);
handleDisconnect(db);
function handleDisconnect(client){
    client.on('error', function (error) {
       if(!error.fatal) return;
       if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;
        console.error('> Re-connecting lost MySQL connection: ' + error.stack);
        db = mysql.createConnection(client.config);
        handleDisconnect(db);
        db.connect();
    });
}
module.exports = db;

