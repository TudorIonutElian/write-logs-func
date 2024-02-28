/**
 * SQL templates for creating the database and table
 * @type {Object}
 * @property {string} createDatabase - SQL template for creating the database
 * @property {string} useDatabase - SQL template for using the database
 * @property {string} createTable - SQL template for creating the table
 */
const sqlTemplates = {
    createDatabase: `CREATE DATABASE IF NOT EXISTS \`cloudwatch_logs\`;`,
    useDatabase: `USE \`cloudwatch_logs\`;`,
    createTable: `${this.useDatabase}; CREATE TABLE IF NOT EXISTS \`logs\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`requestType\` VARCHAR(5) NOT NULL,
        \`requestUrl\` VARCHAR(5) NOT NULL,
        \`request_ip\` VARCHAR(50) NOT NULL,
        \`request_vpc\` VARCHAR(50) NOT NULL,
        \`request_region\` VARCHAR(50) NOT NULL,
        \`request_availability_zone\` VARCHAR(50) NOT NULL,
        \`request_iam_role\` VARCHAR(50) NOT NULL,
        \`request_api_key\` VARCHAR(50) NOT NULL,
        \`request_username\` VARCHAR(50) NOT NULL,
        \`request_authorization_policy\`BOOLEAN NOT NULL DEFAULT FALSE,
        \`request_scanned\`BOOLEAN NOT NULL DEFAULT FALSE
    );`
};

module.exports = { sqlTemplates };