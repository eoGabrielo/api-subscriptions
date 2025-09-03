//Criar token
const jwt = require("jsonwebtoken");

const signAccessToken = (payload) => {
  //Token pro headers
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "15m",
  });
};

const signRefreshToken = (payload) => {
  //Token pro cookie
  return jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES || "7d",
  });
};

module.exports = { signAccessToken, signRefreshToken };
