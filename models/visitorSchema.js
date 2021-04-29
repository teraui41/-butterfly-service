const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const visitorSchema = new Schema({
  uuid: {
    type: Schema.Types.String,
    primary: true,
  },
  visitYear: {
    type: Schema.Types.String,
    default: '',
  },
  visitMonth: {
    type: Schema.Types.String,
    default: '',
  },
  visitDay: {
    type: Schema.Types.String,
    default: '',
  },
  count: {
    type: Schema.Types.Number,
    default: 0,
  }
});

visitorSchema.plugin(mongoosePaginate);

module.exports = visitorSchema;
