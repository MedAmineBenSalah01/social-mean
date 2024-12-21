const jwt = require("jsonwebtoken");

var createJWT = async (user, keepMe) => {
  const EXPIRES_IN = keepMe ? "14d" : "24h";
  return await jwt.sign({ ...user }, process.env.JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
};
var verifyJWT = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createJWT,
  verifyJWT,
};
