const database = require("../client");

class UsersRepository {
  constructor({ table }) {
    this.table = table;
    this.database = database;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from user where email = ?`,
      [email]
    );
    return rows[0];
  }

  async create(user) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, hashed_password) values (?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );
    return rows.insertId;
  }
}

module.exports = UsersRepository;
