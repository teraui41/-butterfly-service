const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
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

userSchema.plugin(mongoosePaginate);

module.exports = userSchema;
