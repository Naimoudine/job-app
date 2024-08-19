const database = require("../client");

class CompaniesRepository {
  constructor({ table }) {
    this.table = table;
    this.database = database;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async readById(companyId) {
    const [rows] = await this.database.query(
      `select * from company where id = ?`,
      [companyId]
    );
    return rows[0];
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from companyAccount where email = ?`,
      [email]
    );
    return rows[0];
  }

  async readOffers(companyId) {
    const [rows] = await this.database.query(
      `select o.*, o.id as offerId from ${this.table} as c join
      offer o on o.company_id = c.id 
      where c.id = ?`,
      [companyId]
    );
    return rows;
  }
}

module.exports = CompaniesRepository;
