const path = require('node:path');


function getProtoPath(...paths) {
    return path.join(__dirname, ...paths);
}

module.exports.getProtoPath = getProtoPath;
