const mysql2 = require('mysql2');

function connectToDatabase(databaseName) {
    return mysql2.createConnection({
        host: process.env.rds_instance_endpoint,
        user: process.env.rds_instance_username,
        password: process.env.rds_instance_password,
        database_name: databaseName ?? process.env.rds_instance_database_name,
    });
}

/**
 * 
 * @param {*} query 
 * @param {*} databaseName 
 * @returns 
 */
async function runQuery(query, databaseName) {
    const connection = connectToDatabase(databaseName);
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { connectToDatabase, runQuery };