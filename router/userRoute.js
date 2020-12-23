const yup = require("yup");
const express = require("express");
const mongoose = require("mongoose");
const isEmpty = require("lodash");
const { userModel } = require("../models");
const { saltHashPassword } = require("../utils/authUtil");
const { successResponse, errorResponse } = require("../utils/responseUtil");

const router = express.Router();

const userValidSchema = yup.object().shape({
  account: yup
    .string()
    .trim()
    .max(20, "帳號不可超過20個字元")
    .required("帳號不可為空"),
  password: yup
    .string()
    .trim()
    .max(10, "密碼不可超過20個字元")
    .required("密碼不可為空"),
});

const register = async (req, res) => {
  try {
    const { body } = req;
    await userValidSchema.validate(body);
    const { account, password } = body;
    const existedUser = await userModel.findOne({
      account: { $eq: account },
    });

    if(!isEmpty(existedUser)) return errorResponse(res, 400, "帳號重複。");

    const uuid = new mongoose.Types.ObjectId();

    const user = new userModel({
      uuid,
      account,
      password: saltHashPassword(password),
      createTime: new Date(),
    });

    await user.save();
    return successResponse(res, {
      message: `帳號建立成功: ${user.account}`
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

router.post("/register", register);

module.exports = router;
