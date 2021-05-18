const format = require('date-fns/format')

const getDateWithoutTime = (strDate = format(new Date(), 'yyyy-MM-dd')) => {
  const date = new Date(strDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return format(new Date(year, month, day, 0, 0, 0), 'yyyy-MM-dd');
};

module.exports.getDateWithoutTime = getDateWithoutTime;
