const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");
const dayjs = require("dayjs");

const login = async (req, res, next) => {
  try {
    const user = await tables.users.readByEmail(req.body.email);

    if (!user) {
      res.status(422).json({
        message:
          "We couldn't find an account matching the email and password you entered. Please check your email and password and try again.",
      });
      return;
    }

    const verify = argon2.verify(user.hashed_password, req.body.password);

    if (verify) {
      delete user.hashed_password;

      const token = jwt.sign(
        { sub: user.id, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("auth_token", token, {
        sameSite: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate(),
      });

      res.json({ user });
    } else {
      res.status(422).json({
        message:
          "We couldn't find an account matching the email and password you entered. Please check your email and password and try again.",
      });
    }
  } catch (error) {
    next(error);
  }
};

const isLogged = ({ res }) => {
  res.sendStatus(200);
};

const logout = ({ res }) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = { login, isLogged, logout };
