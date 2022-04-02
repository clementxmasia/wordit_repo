// This exports variables required to connect to the database
module.exports = {

    // This connects to the current database server
    db_conf: {
        connectionLimit: 15,
        host: "127.0.0.1",
        Port: 3306,
        database: "wordit_db",
        user: "root",
        password: ""
    }

};