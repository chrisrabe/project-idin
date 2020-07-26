const Cloudant = require('@cloudant/cloudant');
const moment = require('moment');
const logger = require('../logger');
const { CLOUDANT_ID, CLOUDANT_API_TOKEN, DATABASE_NAME } = require('../../_config/db.config');

const cloudantConfig = {
    account: CLOUDANT_ID,
    plugins: {
        iamauth: {
            iamApiKey: CLOUDANT_API_TOKEN
        }
    }
};

// Singleton class of Cloudant Database
class CloudantDatabase {
    static instance;
    static database;

    constructor() {
        CloudantDatabase.getInstance().then();
    }

    static getInstance = async () => {
        if (!this.instance) {
            try {
                this.database = await this.dbCloudantConnect();
                this.instance = this;
            } catch (err) {
                logger.error(`Connect failure ${err.message} for Cloudant ID: ${CLOUDANT_ID}`);
                throw err;
            }
        }
        return this.instance;
    }

    static dbCloudantConnect = async () => {
        return new Promise((resolve, reject) => {
            Cloudant(cloudantConfig, (err, cloudant) => {
                if (err) {
                    logger.error(`Connect failure: ${err.message} for Cloudant ID: ${CLOUDANT_ID}`);
                    reject(err);
                } else {
                    cloudant.db.list().then((body) => {
                        if (!body.includes(DATABASE_NAME)) {
                            logger.info(`DB does not exist... creating: ${DATABASE_NAME}`);
                            cloudant.db.create(DATABASE_NAME).then(() => {
                                if (err) {
                                    logger.error(`DB Create failure: ${err.message} for Cloudant ID: ${CLOUDANT_ID}`);
                                    reject(err);
                                }
                            })
                        }
                        let db = cloudant.use(DATABASE_NAME);
                        logger.info(`Connection success! Connected to DB: ${DATABASE_NAME}`);
                        resolve(db);
                    }).catch(err => {
                        logger.error(err);
                        reject(err);
                    });
                }
            });
        });
    }


    /**
     * Find all resources that match the specified partial name.
     */
    find = (queryParams) => {
        return new Promise((resolve, reject) => {
            let selector = {...queryParams};
            if (queryParams.partialItemName !== undefined) {
                const partialItemName = queryParams.partialItemName;
                const search = createSearchString(partialItemName);
                selector['itemName'] = { '$regex': search };
                delete selector.partialItemName;
            }
            if (queryParams.partialOrgName !== undefined) {
                const partialOrgName = queryParams.partialOrgName;
                const search = createSearchString(partialOrgName);
                selector['orgName'] = { '$regex': search };
                delete selector.partialOrgName;
            }
            CloudantDatabase.database.find({
                selector
            }, (err, documents) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ data: JSON.stringify(documents.docs), statusCode: 200 });
                }
            });
        });
    }

    /**
     * Delete a resource that matches a ID.
     */
    deleteById = (id) => {
        return new Promise((resolve, reject) => {
            CloudantDatabase.database.get(id, (err, document) => {
                if (err) {
                    resolve(err.statusCode);
                } else {
                    CloudantDatabase.database.destroy(id, document._rev, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(200);
                        }
                    });
                }
            });
        });
    }

    /**
     * Create a resource with the specified attributes
     */
    create = (data) => {
        return new Promise((resolve, reject) => {
            const id = uuidv4();
            const createdAt = moment().toISOString();
            const reqData = {
                id,
                _id: id,
                createdAt,
                lastUpdated: createdAt,
                ...data
            };
            CloudantDatabase.database.insert(reqData, (err, result) => {
                if (err) {
                    logger.error(`Error occured: ${err.message} create()`);
                    reject(err);
                } else {
                    resolve({data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201});
                }
            });
        });
    }

    update = (id, newData) => {
        return new Promise(((resolve, reject) => {
            CloudantDatabase.database.get(id, (err, document) => {
                if (err) {
                    reject({statusCode: err.statusCode});
                } else {
                    const item = {...document, ...newData};
                    CloudantDatabase.database.insert(item, (err, result) => {
                        if (err) {
                            logger.error(`Error occured: ${err.message} update()`);
                            reject(err);
                        } else {
                            resolve({data: result, statusCode: 200});
                        }
                    });
                }
            })
        }))
    }

    info = () => {
        return CloudantDatabase.database.get(dbName).then(res => {
            logger.info(res);
            return res;
        });
    }
}

module.exports = CloudantDatabase;
