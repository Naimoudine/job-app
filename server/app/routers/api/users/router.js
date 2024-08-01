const express = require("express");
const router = express.Router();

// middleware
const { hashPassword } = require("../../../services/auth");

// controllers
const { browse, add } = require("../../../controllers/userActions");

router.get("/", browse);
router.post("/", hashPassword, add);

module.exports = router;
