const tables = require('../../database/tables')

async function browse(req, res, next) {
  try {
    const offers = await tables.offers.readAll()
    res.json(offers)
  }
  catch (error) {
    next(error)
  }
}

async function read(req, res, next) {
  try {
    const offer = await tables.offers.readById(req.params.id)
    res.json(offer)
  }
  catch (error) {
    next(error)
  }
}

module.exports = {
  browse,
  read,
}
