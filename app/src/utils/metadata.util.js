const lodash = require("lodash");

const getInformationData = ({ fields = [], object = {} }) => {
    return lodash.pick(object, fields);
};

module.exports = {
    getInformationData,
};
