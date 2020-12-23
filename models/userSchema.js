const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uuid: {
    type: Schema.Types.String,
    primary: true,
  },
  account: {
    type: Schema.Types.String,
    require: true,
  },
  password: {
    type: Schema.Types.String,
    require: true,
  },
  createTime: {
    type: Schema.Types.Date,
    default: new Date()
  },
});

module.exports = userSchema;
