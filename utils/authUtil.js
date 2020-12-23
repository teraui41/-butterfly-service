const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { SALT_SECRET } = process.env;

const sha512 = function(password, salt) {
  const hash = crypto.createHmac(
    "sha512",
    salt
  );

  hash.update(password);
  const value = hash.digest("hex");

  return {
    salt,
    passwordHash: value.toString()
  };
};

module.exports.saltHashPassword = userpassword => {
  const passwordData = sha512(userpassword, SALT_SECRET);
  return passwordData.passwordHash;
};

module.exports.generateToken = user => jwt.sign(user, process.env.AUTH_SECRET);
