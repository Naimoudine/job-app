const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const companies = await tables.companies.readAll();
    res.json(companies);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const company = await tables.companies.readById(req.params.id);
    res.json(company);
  } catch (error) {
    next(error);
  }
};

const readOffers = async (req, res, next) => {
  try {
    const offers = await tables.companies.readOffers(req.params.id);
    res.json(offers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  readOffers,
};
