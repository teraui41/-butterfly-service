const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { getDateWithoutTime } = require('../utils/dateUtil');
const { Schema } = mongoose;

const visitorSchema = new Schema({
  createTime: {
    type: Schema.Types.Date,
    default: getDateWithoutTime(),
    primary: true,
  },
  count: {
    type: Schema.Types.Number,
    default: 0,
  }
});

visitorSchema.plugin(mongoosePaginate);

module.exports = visitorSchema;
