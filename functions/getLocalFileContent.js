const getLocalFileContent = (filePath) => {
    const fs = require('fs');
    return fs.readFileSync(filePath, 'utf8');
}

module.exports = { getLocalFileContent };