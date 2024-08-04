const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const addApply = async (req, res, next) => {
  try {
    const insertedId = await tables.users.createApply(
      req.params.userId,
      req.params.offerId
    );
    if (!insertedId) {
      throw new Error("error while creating job application");
    }
    res.json(insertedId);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const userExists = await tables.users.readByEmail(req.body.email);

    if (userExists) {
      res.status(409).json({ message: "Email already in use. Please log in." });
    }

    const insertId = await tables.users.create(req.body);

    if (!insertId) {
      throw new Error("Error while creating account");
    }

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

module.exports = { browse, add, addApply };
