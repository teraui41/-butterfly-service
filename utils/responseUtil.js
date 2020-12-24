const successResponse = (res, { message, ...data }) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};
const errorResponse = (res, code = 400, message = "伺服器錯誤") => {
  return res.status(code).json({
    success: false,
    data: { message },
  });
};

module.exports.errorResponse = errorResponse;
module.exports.successResponse = successResponse;
