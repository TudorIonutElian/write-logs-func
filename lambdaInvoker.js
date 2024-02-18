const handler = require('./index').handler;
const jsonPayload = require('./event.json');

handler(jsonPayload).then((response) => {
    console.log(response);
});