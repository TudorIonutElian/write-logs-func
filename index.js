const {getFileKey} = require('./functions/getFileKey');
const {downloadFileFromS3} = require('./functions/downloadFile');
const fs = require('fs');
const path = require('path');
const { getLocalFileContent } = require('./functions/getLocalFileContent');

exports.handler = async (event) => {
  
  const newFileKey = getFileKey(event);

  // parse the new file line by line
  // connect to database
  // check if database orders is created
  // if yes, then write logs into the table

  try {
    await downloadFileFromS3(newFileKey);    
  } catch (error) {
    console.log(error);
  }

  return JSON.stringify({
    statusCode: 200,
    fileContentData: getLocalFileContent(`/tmp/${newFileKey}`)
  });
};