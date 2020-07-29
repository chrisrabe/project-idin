const getValueFromArrayById = (id, arr) => {
    const res = arr.filter(item => item.id === id);
    return res.length > 0 ? res[0] : undefined;
};

module.exports = {
    getValueFromArrayById
}
