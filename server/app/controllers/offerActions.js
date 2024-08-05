const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const offers = await tables.offers.readAll();
    res.json(offers);
  } catch (error) {
    next(error)
  }
}

const read = async (req, res, next) => {
  try {
    const offer = await tables.offers.readById(req.params.id);
    res.json(offer);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  browse,
  read
}