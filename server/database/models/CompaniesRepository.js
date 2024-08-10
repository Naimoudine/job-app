const database = require("../client");

class CompaniesRepository {
  constructor({ table }) {
    this.table = table;
    this.database = database;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from company`);
    return rows;
  }
}

module.exports = CompaniesRepository;
