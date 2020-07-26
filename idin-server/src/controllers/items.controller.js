const database = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const { ITEMS } = require('../_util/constants');
const validation = require('../_util/api.validation');

exports.getItemsList = async () => {
    const db = await database.getInstance();
    const query = {
        itemName: {
            '$regex': ".*"
        }
    };
    const response = await db.find(query);
    const items = JSON.parse(response.data);
    if (items.length < ITEMS.length) {
        // auto generate missing items
        const missingItems = ITEMS.filter(item => !items.includes(item));
        for (const item of missingItems) {
            item.isGenerated = true;
            await db.create(item);
            items.push(item);
        }
    }
    return items;
};

exports.createItem = async (itemName, description) => {
    const db = await database.getInstance();
    // do not create if it already exists
    const items = await db.find({ itemName });
    const result = JSON.parse(items.data);
    if (result.length > 0) {
        throw new AppError(errorType.badRequest.unknown, "Item already exists");
    }
    // create new item
    const newData = {
        itemName,
        description,
        isGenerated: false
    };
    validation.validateRequiredFields(newData, Object.keys(newData));
    // create the item
    return db.create(newData);
};

exports.updateItem = async (itemId) => {

};

exports.deleteItem = async (itemId) => {

};
