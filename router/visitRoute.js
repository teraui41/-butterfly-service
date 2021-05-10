const express = require("express");
const { isEmpty } = require("lodash");
const mongoose = require("mongoose");
const { visitorModel } = require("../models");
const { getDateRange } = require("../utils/formatUtil");
const { getDateWithoutTime } = require("../utils/dateUtil");
const { successResponse, errorResponse } = require("../utils/responseUtil");

const router = express.Router();

const visitor = async (req, res) => {
  try {
    const existVisitor = await visitorModel.findOne({
      createTime: {
        $eq: getDateWithoutTime(),
      },
    });

    if (isEmpty(existVisitor)) {
      const newVisitor = new visitorModel({
        createTime: getDateWithoutTime(),
        count: 1,
      });
      await newVisitor.save();
    } else {
      existVisitor.count++;
      await existVisitor.save();
    }

    return successResponse(res, {
      message: "visited",
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

const getVisitorByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const records = await visitorModel.findOne({
        ...getDateRange("createTime", startDate, endDate),
    });

    return successResponse(res, {
      records,
      message: "查詢成功",
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

router.get("/report", getVisitorByDate);
router.post("/visit", visitor);

module.exports = router;
