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
  username: {
    type: Schema.Types.String,
    default: '',
  },
  status: {
    type: Schema.Types.Number,
    default: 1,
  },
  password: {
    type: Schema.Types.String,
    require: true,
    select: false,
  },
  createTime: {
    type: Schema.Types.Date,
    default: new Date()
  },
});

userSchema.plugin(mongoosePaginate);

module.exports = userSchema;
