const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

const addApply = async (req, res, next) => {
  try {
    const insertedId = await tables.users.createApply(req.params.userId, req.params.offerId);
    if(!insertedId) {
      throw new Error("error while creating job application");
    }
    res.json(insertedId)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  browse,
  addApply
}