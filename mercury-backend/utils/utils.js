const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user) => {
  if (!user.role) {
    throw new Error("No user role provided!");
  }
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      role: user.role,
      iss: "api.mercury",
      aud: "api.mercury",
    },
    "SECRET_KEY",
    { algorithm: "HS256", expiresIn: "1h" }
  );
};

const hashedPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};

module.exports = {
  createToken,
  hashedPassword,
  comparePassword,
};
