const express = require("express");
const router = express.Router();

// users
const usersRouter = require("./users/router");
router.use("/users", usersRouter);

// offers
const offersRouter = require("./offers/router");
router.use("/offers", offersRouter);

module.exports = router;