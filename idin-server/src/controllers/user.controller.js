const database = require('../_util/database');

exports.getDbInstance = async () => {
    const cloudant = await database.getInstance();
    const data = await cloudant.find({name: 'something'});
    console.log(data);
};
