const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const map = require("lodash/map");
const format = require("date-fns/format");
const addDays = require("date-fns/addDays");
const { isEmpty } = require("lodash");
const { answerModel, visitorModel, systemModel } = require("../models");
const { getDateRange } = require("../utils/formatUtil");
const syncFile = require("../assets/flyadv-export.json");
const { successResponse, errorResponse } = require("../utils/responseUtil");

const report = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      startDate = null,
      endDate = null,
    } = req.query;

    const options = {
      page,
      limit,
      sort: [["createTime", -1]],
    };

    const query = {
      ...getDateRange("createTime", startDate, endDate),
    };

    const records = await answerModel.paginate(query, options);

    return successResponse(res, {
      message: "查詢成功",
      records,
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

const getWeekAnswerData = (answers) => {
  return answers.reduce((rs, answer) => {

  },{})
}

const formatAnswerByWeek = answers => {

  // const 

}

const dashboard = async (req, res) => {
  try {
    const startDate = format(addDays(new Date(), -7), 'yyyy-MM-dd');
    const endDate = format(new Date(), 'yyyy-MM-dd');

    const weekVisits = await visitorModel.find({
      ...getDateRange("createTime", startDate, endDate),
    });

    const answers = await answerModel.find({
      ...getDateRange("createTime", startDate, endDate),
    });

    const weekAnswers = {

    }

    // const totalVisit = await visitorModel

    return successResponse(res, {
      weekVisits,
      weekAnswers,
      totalVisit: 0,
      totalAnswers: 0,
      message: "查詢成功",
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};


const loadFile = async (_, res) => {
  try {
    const sysCode = await systemModel.findOne({
      sysCode: { $eq: "lastUpdate" },
    });

    const result = map(syncFile.itemList, (item) => {
      return {
        uuid: new mongoose.Types.ObjectId(),
        bedNo: item.userId,
        language: "tw",
        createTime: new Date(item.timeStamp),
        answers: item.answerList,
        remark: "舊系統同步",
      };
    }).filter((item) => {
      if (sysCode === null || isEmpty(sysCode.content)) return true;
      const lastUpdateTime = new Date(parseInt(sysCode.content, 10));
      return item.createTime > lastUpdateTime;
    });

    await answerModel.insertMany(result);

    if (sysCode === null) {
      const system = new systemModel({
        uuid: new mongoose.Types.ObjectId(),
        sysCode: "lastUpdate",
        sysName: "最近同步時間",
        content: (+new Date()).toString(),
        remark: "",
      });
      await system.save();
    } else {
      sysCode.content = (+new Date()).toString();
      await sysCode.save();
    }

    return successResponse(res, {
      message: `同步成功`,
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

router.get("/", report);
router.post("/sync", loadFile);
router.get("/dashboard", dashboard);

module.exports = router;
