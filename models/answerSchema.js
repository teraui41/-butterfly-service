const mongoose = require("mongoose");
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
  createTime: {
    type: Schema.Types.Date,
  },
});

module.exports = answerSchema;
