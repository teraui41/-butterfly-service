const express = require("express");
const mongoose = require("mongoose");
const { answerModel } = require("../models");
const { successResponse, errorResponse } = require("../utils/responseUtil");
const router = express.Router();

const addAnswer = async (req, res) => {
  try {
    const { bedNo, language, answers } = req.body;
    const uuid = new mongoose.Types.ObjectId();
    const answer = new answerModel({
      uuid,
      bedNo,
      language,
      answers,
      createTime: new Date(),
    });
    await answer.save();

    return successResponse(res, {
      message: `提交成功`,
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

router.post("/", addAnswer);

module.exports = router;
