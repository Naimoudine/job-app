const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const insertId = await tables.users.create(...req.body);
    if (!insertId) {
      throw new Error("Error while creating account");
    }
    res.json({ insertId });
  } catch (error) {
    next(error);
  }
};

module.exports = { browse, add };
