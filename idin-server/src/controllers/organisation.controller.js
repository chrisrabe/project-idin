const database = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');

exports.getAllOrganisation = async () => {
    const db = await database.getInstance();
    const query = {
        orgName: {
            '$regex': ".*"
        }
    };
    const response = await db.find(query);
    return JSON.parse(response.data);
};

exports.createOrganisation = async (name, isSupplier, userId) => {
    const db = await database.getInstance();
    // ensure that organisation name does not exist yet
    const orgNameRes = await db.find({ orgName: name });
    const result = JSON.parse(orgNameRes.data);
    if (result.length > 0) {
        throw new AppError(errorType.badRequest.unknown, "Organisation already exists");
    }
    // create the organisation
    const data = {
        orgName: name,
        isSupplier
    };
    const newOrg = await db.create(data);
    const { id } = newOrg.data;
    // find the user with the user id
    const user = await db.find({ '_id': userId });
    const userData = JSON.parse(user.data)[0];
    userData.organisationId = id;
    // update the user in the database
    await db.update(userId, userData);
    return newOrg;
}
