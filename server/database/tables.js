const UsersRepository = require("../database/models/UsersRepository");

const tables = {};

tables.users = new UsersRepository({table: "user"});

module.exports = tables;