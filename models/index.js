const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const answerSchema = require('./answerSchema');
const visitorSchema = require('./visitorSchema');
const userModel = mongoose.model('users', userSchema);
const answerModel = mongoose.model('answer', answerSchema);
const visitorModel = mongoose.model('visitor', visitorSchema);
const {
  MONGO_URI,
  MONGO_PORT,
  MONGO_DATABASE,
} = process.env;

const dbUrl = `${MONGO_URI}:${MONGO_PORT}/${MONGO_DATABASE}`;
console.log("Mongo DB run at: ", dbUrl)

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true,});

module.exports.connection = mongoose.connection;
module.exports.answerSchema = answerSchema;
module.exports.visitorModel = visitorModel;
module.exports.answerModel = answerModel;
module.exports.userModel = userModel;
