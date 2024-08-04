const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    if (hashedPassword) {
      delete req.body.password;
      req.body.hashedPassword = hashedPassword;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;

    if (!token) {
      res.sendStatus(403);
      return;
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { hashPassword, verifyToken };
