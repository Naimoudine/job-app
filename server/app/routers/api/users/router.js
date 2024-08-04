const express = require("express");
const router = express.Router();

// middleware
const { hashPassword, verifyToken } = require("../../../services/auth");

// controllers
const { browse, readById, add } = require("../../../controllers/userActions");

router.get("/", verifyToken, browse);
router.get("/:id", verifyToken, readById);
router.post("/", hashPassword, add);

module.exports = router;
