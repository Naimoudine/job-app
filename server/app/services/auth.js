const argon2 = require("argon2");

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

module.exports = { hashPassword };
