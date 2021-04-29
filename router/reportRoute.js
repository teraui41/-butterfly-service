const express = require("express");
const router = express.Router();
const { answerModel } = require("../models");
const { successResponse, errorResponse } = require("../utils/responseUtil");

const report = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req;

    const options = {
      page,
      limit,
      sort: [["createTime", -1]],
    }

    const records = await answerModel
      .paginate({}, options);

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
