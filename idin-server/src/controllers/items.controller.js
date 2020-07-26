const database = require('../_util/database');
const errorType = require('../_util/constants/error.types');
const AppError = require('../_util/api.error');
const { ITEMS } = require('../_util/constants');

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

exports.createItem = async () => {

};

exports.updateItem = async (itemId) => {

};

exports.deleteItem = async (itemId) => {

};
