const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const answerSchema = require('./answerSchema');
const userModel = mongoose.model('users', userSchema);
const answerModel = mongoose.model('answer', answerSchema);
const {
  MONGO_URI,
  MONGO_PORT,
  MONGO_DATABASE,
  MONGO_POOL_SIZE,
} = process.env;

const dbUrl = `${MONGO_URI}:${MONGO_PORT}/${MONGO_DATABASE}?poolSize=${MONGO_POOL_SIZE}`;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true,});

module.exports.connection = mongoose.connection;
module.exports.answerSchema = answerSchema;
module.exports.answerModel = answerModel;
module.exports.userModel = userModel;
