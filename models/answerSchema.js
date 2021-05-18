const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const answerSchema = new Schema({
  uuid: {
    type: Schema.Types.String,
    primary: true,
  },
  bedNo: {
    type: Schema.Types.String,
    required: true,
  },
  language: {
    type: Schema.Types.String,
    enum: ['tw', 'en', 'vn', 'id'], // tw: 繁體中文, en: English, vn: Việt Ngữ, id: Bahasa Indonesia
    default: 'tw'
  },
  answers: {
    type: Schema.Types.Array,
    required: true,
  },
  remark: {
    type: Schema.Types.String,
    default: '',
  },
  createTime: {
    type: Schema.Types.Date,
  },
});

answerSchema.plugin(mongoosePaginate);

module.exports = answerSchema;
