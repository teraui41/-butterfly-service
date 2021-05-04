const { isEmpty } = require("lodash");

const getDateRange = (fieldName, startDate, endDate) => {
  if (isEmpty(startDate) || isEmpty(endDate)) return {};
  return { [fieldName]: { $gte: startDate, $lte: endDate } };
};

module.exports.getDateRange = getDateRange;
