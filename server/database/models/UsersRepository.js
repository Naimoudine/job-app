const database = require("../client");

class UsersRepository {
  constructor({ table }) {
    this.table = table;
    this.database = database;
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

  async createBookmark(userId, offerId) {
    const [rows] = await this.database.query(
      `insert ignore into bookmarking (user_id, offer_id) values (?, ?)`,
      [userId, offerId]
    );
    return rows.insertId;
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
      `select * from ${this.table} where email = ?`,
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

  async updatePicture(picture, userId) {
    const [rows] = await this.database.query(
      `update user set picture = ? where id = ?`,
      [picture, userId]
    );
    return rows.affectedRows;
  }

  async deleteApplication(userId, offerId) {
    const [rows] = await this.database.query(
      `delete from applying where user_id = ? and offer_id = ?`,
      [userId, offerId]
    );
    return rows.affectedRows;
  }

  async deleteBookmark(userId, offerId) {
    const [rows] = await this.database.query(
      `delete from bookmarking where user_id = ? and offer_id = ?`,
      [userId, offerId]
    );
    return rows.affectedRows;
  }
}

module.exports = UsersRepository;
