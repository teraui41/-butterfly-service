const mongoose = require("mongoose");
const { Schema } = mongoose;

const systemSchema = new Schema({
  sysCode: {
    type: Schema.Types.String,
    default: '',
  },
  sysName: {
    type: Schema.Types.String,
    default: '',
  },
  content: {
    type: Schema.Types.String,
    default: '',
  },
  remark: {
    type: Schema.Types.String,
    default: '',
  }
});

module.exports = systemSchema;
