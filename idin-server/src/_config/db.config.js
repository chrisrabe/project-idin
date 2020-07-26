const config = require('config');

let id = undefined;
let apiToken = undefined;

if (config.has('database')) {
    const dbConfig = config.get('database');
    if (dbConfig.cloudantId) {
        id = dbConfig.cloudantId;
    }
    if (dbConfig.cloudantApiToken) {
        apiToken = dbConfig.cloudantApiToken;
    }
}

module.exports = {
    CLOUDANT_ID: id,
    CLOUDANT_API_TOKEN: apiToken
}
