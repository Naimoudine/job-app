const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const offers = await tables.offers.readAll();
    res.json(offers);
  } catch (error) {
    next(error)
  }
}

module.exports = {browse}