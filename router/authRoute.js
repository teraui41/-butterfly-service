const yup = require("yup");
const express = require("express");
const {isEmpty, pick} = require("lodash");
const { userModel } = require("../models");
const { saltHashPassword, generateToken } = require("../utils/authUtil");
const { successResponse, errorResponse } = require("../utils/responseUtil");

const router = express.Router();

const memberValidSchema = yup.object().shape({
  bedNo: yup
    .string()
    .trim()
    .max(20, "床號不可超過20個字元")
    .required("床號不可為空"),
  language: yup
    .string()
    .trim()
    .oneOf(['tw', 'en', 'vn', 'id'])
    .required("語言不可為空"),
});

const login = async (req, res) => {
  try {
    const { account, password } = req.body;
    const user = await userModel.findOne({ account }).select('+password');

    if (isEmpty(user)) {
      return errorResponse(res, 400, "使用者不存在");
    }

    const hashPassword = saltHashPassword(password, process.env.SALT_SECRET);

    if (hashPassword !== user.password)
      return errorResponse(res, 400, "驗證失敗");

    const signInfo = pick(user, ["uuid", "account"]);
    const token = generateToken(signInfo);

    return successResponse(res, {
      token,
      account: user.account,
      username: user.username
    });
  } catch (error) {
    return errorResponse(res);
  }
};

const logout = async (req, res) => {
  try {
    req.logout();
    return successResponse(res);
  }catch(error) {
    return errorResponse(res);
  }
}

const getToken = async (req, res) => {
  try {
    const { CLIENT_ID } = process.env;

    if(req.body.clientId !== CLIENT_ID) {
      return errorResponse(res, 401, '驗證錯誤');
    }

    const { bedNo, language } = req.body;

    await memberValidSchema.validate({ bedNo, language });

    const token = generateToken({ bedNo, language });
    return successResponse(res, {
      token,
      bedNo,
    });
  }catch(error) {
    return errorResponse(res);
  }
}

router.post("/login", login);
router.post("/logout", logout);
router.post("/token", getToken);

module.exports = router;
