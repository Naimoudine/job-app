const express = require("express");
const router = express.Router();

// middleware
const { verifyToken } = require("../../services/auth");

// login
const { login } = require("../../../app/controllers/authActions");
router.use("/login", login);

// logout
const { logout } = require("../../controllers/authActions");
router.use("/logout", verifyToken, logout);

// verify auth
const { isLogged } = require("../../controllers/authActions");
router.use("/verify-auth", verifyToken, isLogged);
// users
const usersRouter = require("./users/router");
router.use("/users", usersRouter);

// offers
const offersRouter = require("./offers/router");
router.use("/offers", offersRouter);

// companies
const companiesRouter = require("./companies/router");
router.use("/companies", companiesRouter);

module.exports = router;
