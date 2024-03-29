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
sqlTemplates.createTable = `CREATE TABLE IF NOT EXISTS \`logs\` (
    id INT PRIMARY KEY auto_increment, 
    requestType VARCHAR(10) NOT NULL,
    requestUrl VARCHAR(10) NOT NULL,
    requestIp VARCHAR(10) NOT NULL,
    requestVpc VARCHAR(50) NOT NULL,
    requestRegion VARCHAR(50) NOT NULL,
    requestAvailabilityZone VARCHAR(50) NOT NULL,
    requestIamRole VARCHAR(50) NOT NULL,
    requestApiKey VARCHAR(50) NOT NULL,
    requestUsername VARCHAR(50) NOT NULL,
    requestAuthorizationPolicy BOOLEAN NOT NULL DEFAULT true,
    requestScanned boolean NOT NULL DEFAULT true
);`;

sqlTemplates.insertLog = `INSERT INTO \`logs\` (
    requestType, 
    requestUrl, 
    requestIp, 
    requestVpc, 
    requestRegion, 
    requestAvailabilityZone, 
    requestIamRole, 
    requestApiKey, 
    requestUsername, 
    requestAuthorizationPolicy, 
    requestScanned
) VALUES (
    requestTypePlaceHolder,
    requestUrlPlaceHolder,
    requestIpPlaceHolder,
    requestVpcPlaceHolder,
    requestRegionPlaceHolder,
    requestAvailabilityZonePlaceHolder,
    requestIamRolePlaceHolder,
    requestApiKeyPlaceHolder,
    requestUsernamePlaceHolder,
    requestAuthorizationPolicyPlaceHolder,
    requestScannedPlaceHolder
);`;
	

module.exports = { sqlTemplates };