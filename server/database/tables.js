const UsersRepository = require("../database/models/UsersRepository");
const OffersRepository = require("../database/models/OffersRepository");

const tables = {};

tables.users = new UsersRepository({table: "user"});
tables.offers = new OffersRepository({table: "offer"});

module.exports = tables;