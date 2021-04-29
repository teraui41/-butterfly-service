const express = require("express");
const mongoose = require("mongoose");
const { answerModel } = require("../models");
const { successResponse, errorResponse } = require("../utils/responseUtil");

const router = express.Router();

const visitor = (req, res) => {
  try {

  }catch(error) {

  }
}

router.post('/visitor', visitor);

module.exports = router;
