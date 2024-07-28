const database = require("../client");

class UsersRepository {
  constructor({table}) {
    this.table = table;
    this.database = database;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select * from ${this.table}`
    ); 
    return rows
  }

  async createApply(userId, offerId) {
    const [rows] = await this.database.query(
      `insert into applying (user_id, offer_id) values (?, ?)`,
      [userId, offerId]
    );
    return rows.insertId;
  }
}

module.exports = UsersRepository;