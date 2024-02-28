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
sqlTemplates.createTable = `USE \`cloudwatch_logs\`; CREATE TABLE IF NOT EXISTS \`logs\` (id INT(11) PRIMARY KEY AUTO_INCREMENT, requestType VARCHAR(5) NOT NULL, requestUrl VARCHAR(5) NOT NULL, request_ip VARCHAR(50) NOT NULL, `;
sqlTemplates.createTable += `request_vpc\` VARCHAR(50) NOT NULL, request_region VARCHAR(50) NOT NULL, request_availability_zone VARCHAR(50) NOT NULL, request_iam_role VARCHAR(50) NOT NULL, request_api_key VARCHAR(50) NOT NULL, `;
sqlTemplates.createTable += `request_username VARCHAR(50) NOT NULL, request_authorization_policy BOOLEAN NOT NULL DEFAULT FALSE, request_scanned BOOLEAN NOT NULL DEFAULT FALSE);`;

module.exports = { sqlTemplates };