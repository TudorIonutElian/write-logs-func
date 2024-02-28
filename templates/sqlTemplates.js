/**
 * SQL templates for creating the database and table
 * @type {Object}
 * @property {string} createDatabase - SQL template for creating the database
 * @property {string} useDatabase - SQL template for using the database
 * @property {string} createTable - SQL template for creating the table
 */
const sqlTemplates = {
    createDatabase: '',
    useDatabase: '',
    createTable: ''
};

sqlTemplates.createDatabase = `CREATE DATABASE IF NOT EXISTS \`cloudwatch_logs\`;`;
sqlTemplates.useDatabase = `USE \`cloudwatch_logs\`;`;
sqlTemplates.createTable = `USE \`cloudwatch_logs\`; CREATE TABLE IF NOT EXISTS logs (id INT PRIMARY KEY auto_increment, request_type VARCHAR(10) NOT NULL);`;

module.exports = { sqlTemplates };