const { errorResponse } = require("../utils/responseUtil");

const { DOMAIN_ACCESS } = process.env;

const domainVerifyMiddleware = (req, res, next) => {
  // const domains = DOMAIN_ACCESS.split(',');
  // const origin = req.get('origin');
  // if(!domains.includes(origin)) {
  //   return errorResponse(res, 403, "拒絕存取");
  // }
  next();
}

module.exports = domainVerifyMiddleware;