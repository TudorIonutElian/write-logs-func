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
        const useDatabaseConnection = await runQuery(sqlTemplates.useDatabase);
        const createTableConnection = await runQuery(sqlTemplates.createTable);

        console.log('Database and table created successfully');

    } catch (err) {
        console.error(err);
    }
}

module.exports = { downloadFileFromS3 };
