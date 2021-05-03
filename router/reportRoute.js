const express = require("express");
const router = express.Router();
const { answerModel } = require("../models");
const { getDateRange } = require('../utils/formatUtil');
const { successResponse, errorResponse } = require("../utils/responseUtil");

const report = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate = null, endDate = null } = req.query;

    const options = {
      page,
      limit,
      sort: [["createTime", -1]],
    }

    const query = {
      ...getDateRange(startDate, endDate),
    }

    const records = await answerModel
      .paginate(query, options);

    return successResponse(res, {
      message: '查詢成功',
      records,
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

router.get("/", report);

module.exports = router;
