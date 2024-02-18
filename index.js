const {getFileKey} = require('./functions/getFileKey');

exports.handler = async (event) => {
  
  const newFileKey = getFileKey(event);

  console.log(`File key is ${newFileKey}`);

  return JSON.stringify({
    statusCode: 200,
    action: "loggedIntoDatabase"
  });
};