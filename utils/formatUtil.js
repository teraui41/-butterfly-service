const { isEmpty } = require("lodash");
const { getDateWithoutTime } = require("./dateUtil");

const getDateRange = (fieldName, startDate, endDate) => {
  if (isEmpty(startDate) || isEmpty(endDate)) return {};
  return {
    [fieldName]: {
      $gte: getDateWithoutTime(startDate),
      $lte: getDateWithoutTime(endDate),
    },
  };
};

module.exports.getDateRange = getDateRange;
