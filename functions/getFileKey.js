/**
 * Retrieves the key of the S3 object from the event.
 * @param {Object} event - The event object containing the S3 records.
 * @returns {string} The key of the S3 object.
 */
/*

*/
const getFileKey = (event) => {
    const records = event.Records;
    const sns = records[0].Sns
    const message = sns.Message;
    const messageRecords = JSON.parse(message).Records[0];

    return messageRecords.s3.object.key;

}

module.exports = { getFileKey };