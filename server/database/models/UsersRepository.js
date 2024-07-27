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
}

module.exports = UsersRepository;