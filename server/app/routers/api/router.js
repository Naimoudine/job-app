const express = require("express");
const router = express.Router();

// login
const { login } = require("../../../app/controllers/authActions");
router.use("/login", login);

// users
const usersRouter = require("./users/router");
router.use("/users", usersRouter);

// offers
const offersRouter = require("./offers/router");
router.use("/offers", offersRouter);

module.exports = router;
