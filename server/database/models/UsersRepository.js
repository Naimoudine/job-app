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

  async readById(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from user where email = ?`,
      [email]
    );
    return rows[0];
  }

  async readApplications(userId) {
    const [rows] = await this.database.query(
      `select o.*, o.id as offerId from applying as a
      join offer o on o.id = a.offer_id
      where user_id = ?`,
      [userId]
    );
    return rows;
  }

  async readBookmarks(userId) {
    const [rows] = await this.database.query(
      `select o.*, o.id as offerId from bookmarking as b
      join offer o on o.id = b.offer_id
      where user_id = ?`,
      [userId]
    );
    return rows;
  }

  async create(user) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, hashed_password) values (?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );
    return rows.insertId;
  }

  async createApply(userId, offerId, cv) {
    const [rows] = await this.database.query(
      `insert ignore into applying (user_id, offer_id, cv) values (?, ?, ?)`,
      [userId, offerId, cv]
    );
    return rows.insertId;
  }
}

module.exports = UsersRepository;
