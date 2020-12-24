const express = require("express");
const {isEmpty, pick} = require("lodash");
const { userModel } = require("../models");
const { saltHashPassword, generateToken } = require("../utils/authUtil");
const { successResponse, errorResponse } = require("../utils/responseUtil");

const router = express.Router();

const login = async (req, res) => {
  try {
    const { account, password } = req.body;
    const user = await userModel.findOne({ account });
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
    });
  } catch (error) {
    return errorResponse(res);
  }
};


router.get('/errAuth', function(req, res) {
  res.json({ message: 'hello' });
});

router.post("/login", login);

module.exports = router;
