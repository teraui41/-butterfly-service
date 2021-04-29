const { isEmpty } = require("lodash");

const getDateRange = (startDate, endDate) => {
  if (isEmpty(startDate) || isEmpty(endDate)) return {};
  return { startDate, endDate };
};

module.exports.getDateRange = getDateRange;
