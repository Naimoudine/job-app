const express = require("express");

const router = express.Router();

// controllers
const { browse } = require("../../../controllers/offerAction");

router.get("", browse);

module.exports = router;