const config = require('config');

let id = '<cloudant_id>';
let apiToken = '<cloudant_apikey>';
let dbName = 'community_db';

if (config.has('database')) {
    const dbConfig = config.get('database');
    if (dbConfig.cloudantId) {
        id = dbConfig.cloudantId;
    }
    if (dbConfig.cloudantApiToken) {
        apiToken = dbConfig.cloudantApiToken;
    }
    if (dbConfig.dbName) {
        dbName = dbConfig.dbName;
    }
}

module.exports = {
    CLOUDANT_ID: id,
    CLOUDANT_API_TOKEN: apiToken,
    DATABASE_NAME: dbName
}
