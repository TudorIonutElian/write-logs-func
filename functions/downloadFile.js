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
            .replace('requestTypePlaceHolder', fullObjectWrite.requestType)
            .replace('requestUrlPlaceHolder', fullObjectWrite.requestUrl)
            .replace('requestIpPlaceHolder', fullObjectWrite.requestIp)
            .replace('requestVpcPlaceHolder', fullObjectWrite.requestVpc)
            .replace('requestRegionPlaceHolder', fullObjectWrite.requestRegion)
            .replace('requestAvailabilityZonePlaceHolder', fullObjectWrite.requestAvailabilityZone)
            .replace('requestIamRolePlaceHolder', fullObjectWrite.requestIamRole)
            .replace('requestApiKeyPlaceHolder', fullObjectWrite.requestApiKey)
            .replace('requestUsernamePlaceHolder', fullObjectWrite.requestUsername)
            .replace('requestAuthorizationPolicyPlaceHolder', fullObjectWrite.requestAuthorizationPolicy)
            .replace('requestScannedPlaceHolder', fullObjectWrite.requestScanned);
        console.log(`Query: ${query}`);

    } catch (err) {
        console.error(err);
    }
}

module.exports = { downloadFileFromS3 };
