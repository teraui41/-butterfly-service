const express = require("express");
const router = express.Router();
const { answerModel } = require("../models");
const { successResponse, errorResponse } = require("../utils/responseUtil");

const report = async (req, res) => {
  try {
    const records = await answerModel.find({}, { _id: false, __v: false }).sort([['createTime', -1]]);

    return successResponse(res, {
      message: `提交成功`,
      records,
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

router.get("/", report);

module.exports = router;
