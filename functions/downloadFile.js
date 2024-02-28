const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { runQuery } = require('./databaseConnector');
const { sqlTemplates } = require('../templates/sqlTemplates');
const fs = require('fs');

const downloadFileFromS3 = async (fileKey) => {
    const bucketName = 'cloudwatch-mock-lambda-bucket';
    
    const s3 = new S3Client({ 
        region: 'eu-central-1',
        signatureVersion: 'v4'
    });
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      });

    
    try {
        const response = await s3.send(command);
        const str = await response.Body.transformToString();
        const strArray = str.split('\n');
        const fullObjectWrite = {};
       
        const keyValuePairs = strArray.map((line) => {
            const lineSplit = line.split(', ');
            console.log(`Line split: ${lineSplit}`);
            lineSplit.reduce((acc, curr) => {
                const [key, value] = curr.split(':');
                console.log(`Key: ${key}, Value: ${value}`);
                fullObjectWrite[key] = value;
            });
        });

        const createDatabaseConnection = await runQuery(sqlTemplates.createDatabase);
        const createTableConnection = await runQuery(sqlTemplates.createTable, 'cloudwatch_logs');
        console.log(`Full object: ${JSON.stringify(fullObjectWrite)}`);
        
        const query = `INSERT INTO \`logs\` (requestType, requestUrl, requestIp, requestVpc, requestRegion, requestAvailabilityZone, requestIamRole, requestApiKey, requestUsername, requestAuthorizationPolicy, requestScanned) 
        VALUES ('${fullObjectWrite.requestUrl}', '${fullObjectWrite.requestUrl}', '10.2.23.36','${fullObjectWrite.requestVpc}', '${fullObjectWrite.requestRegion}', '${fullObjectWrite.requestAvailabilityZone}', '${fullObjectWrite.requestIamRole}', '${fullObjectWrite.requestApiKey}', '${fullObjectWrite.requestUsername}', ${fullObjectWrite.requestAuthorizationPolicy}, ${fullObjectWrite.requestScanned});`;
        console.log(`Query: ${query}`);
        const insertLogConnection = await runQuery(query, 'cloudwatch_logs');
       

    } catch (err) {
        console.error(err);
    }
}

module.exports = { downloadFileFromS3 };
