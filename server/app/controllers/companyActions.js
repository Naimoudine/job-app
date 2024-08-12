const tables = require('../../database/tables')

async function browse(req, res, next) {
  try {
    const companies = await tables.companies.readAll()
    res.json(companies)
  }
  catch (error) {
    next(error)
  }
}

async function read(req, res, next) {
  try {
    const company = await tables.companies.readById(req.params.id)
    res.json(company)
  }
  catch (error) {
    next(error)
  }
}

async function readOffers(req, res, next) {
  try {
    const offers = await tables.companies.readOffers(req.params.id)
    res.json(offers)
  }
  catch (error) {
    next(error)
  }
}

module.exports = {
  browse,
  read,
  readOffers,
}
