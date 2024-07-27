const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = {browse}