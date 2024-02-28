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
            const lineKeyValue = lineSplit.reduce((acc, curr) => {
                const [key, value] = curr.split(':');
                fullObjectWrite[key] = value;
            });
        });

        const createDatabaseConnection = await runQuery(sqlTemplates.createDatabase);
        const createTableConnection = await runQuery(sqlTemplates.createTable, 'cloudwatch_logs');

        const query = sqlTemplates.insertLog
            .replace('requestTypePlaceHolder', fullObjectWrite.requestUrl)
            .replace('requestUrlPlaceHolder', fullObjectWrite.requestUrl)
            .replace('requestIpPlaceHolder', fullObjectWrite.request_ip)
            .replace('requestVpcPlaceHolder', fullObjectWrite.request_vpc)
            .replace('requestRegionPlaceHolder', fullObjectWrite.request_region)
            .replace('requestAvailabilityZonePlaceHolder', fullObjectWrite.request_availability_zone)
            .replace('requestIamRolePlaceHolder', fullObjectWrite.requestIamRole)
            .replace('requestApiKeyPlaceHolder', fullObjectWrite.request_api_key)
            .replace('requestUsernamePlaceHolder', fullObjectWrite.request_username)
            .replace('requestAuthorizationPolicyPlaceHolder', fullObjectWrite.request_authorization_policy)
            .replace('requestScannedPlaceHolder', fullObjectWrite.request_scanned);
        console.log(`Query: ${query}`);
        const insertLogConnection = await runQuery(query, 'cloudwatch_logs');
        console.log(`Full object: ${JSON.stringify(fullObjectWrite)}`);

    } catch (err) {
        console.error(err);
    }
}

module.exports = { downloadFileFromS3 };
