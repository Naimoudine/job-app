const UsersRepository = require("../database/models/UsersRepository");
const OffersRepository = require("../database/models/OffersRepository");
const CompaniesRepository = require("../database/models/CompaniesRepository");

const tables = {};

tables.users = new UsersRepository({ table: "user" });
tables.offers = new OffersRepository({ table: "offer" });
tables.companies = new CompaniesRepository({ table: "company" });

module.exports = tables;
