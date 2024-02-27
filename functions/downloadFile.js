const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');
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
        
        console.log(`Lines array: ${JSON.stringify(strArray)}`);
        
        
        
        const tmpDirectory = '/tmp';
        const temporaryFilePath = `${tmpDirectory}/${fileKey}`;
        fs.writeFileSync(temporaryFilePath, str);
    } catch (err) {
    console.error(err);
    }
}

module.exports = { downloadFileFromS3 };