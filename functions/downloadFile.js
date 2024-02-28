const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { connectToDatabase, runQuery } = require('./databaseConnector');
const fs = require('fs');

const downloadFileFromS3 = async (fileKey) => {
    const bucketName = 'cloudwatch-mock-lambda-bucket';
    const localFilePath = `/tmp/${fileKey}`;
    
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
        
        console.log(`Lines array: ${JSON.stringify(strArray)}`);
       
        const keyValuePairs = strArray.map((line) => {
            const lineSplit = line.split(', ');
            const lineKeyValue = lineSplit.reduce((acc, curr) => {
                const [key, value] = curr.split(':');
                fullObjectWrite[key] = value;
            });
        });

        const query = `CREATE DATABASE IF NOT EXITS cloudwatch_logs;`;
        const results = await runQuery(query);

        console.log(`Results: ${JSON.stringify(results)}`);

    } catch (err) {
    console.error(err);
    }
}

module.exports = { downloadFileFromS3 };
