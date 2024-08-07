const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const readById = async (req, res, next) => {
  try {
    const user = await tables.users.readById(req.params.userId);
    if (!user) {
      res.status(409).json({ message: "No user found" });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const readApplications = async (req, res, next) => {
  try {
    const applications = await tables.users.readApplications(req.params.userId);
    if (!applications) {
      res.status(404).json({ message: "No applications found" });
    }
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

const readBoomarks = async (req, res, next) => {
  try {
    const bookmarks = await tables.users.readBookmarks(req.params.userId);
    if (!bookmarks) {
      res.status(404).json({ message: "No bookmarks found" });
    }
    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
};

const addApply = async (req, res, next) => {
  try {
    const insertedId = await tables.users.createApply(
      req.params.userId,
      req.params.offerId,
      req.file.path
    );
    res.status(201).json(insertedId);
  } catch (error) {
    next(error);
  }
};

const addBookmark = async (req, res, next) => {
  try {
    const insertId = await tables.users.createBookmark(
      req.params.userId,
      req.params.offerId
    );
    res.status(201).json(insertId);
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

const destroyApplication = async (req, res, next) => {
  try {
    const affectedRows = await tables.users.deleteApplication(
      req.params.userId,
      req.params.offerId
    );
    res.status(204).json(affectedRows);
  } catch (error) {
    next(error);
  }
};

const destroyBookmark = async (req, res, next) => {
  try {
    const affectedRows = await tables.users.deleteBookmark(
      req.params.userId,
      req.params.offerId
    );

    res.status(204).json(affectedRows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  readById,
  readApplications,
  readBoomarks,
  add,
  addApply,
  addBookmark,
  destroyApplication,
  destroyBookmark,
};
