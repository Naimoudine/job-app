const express = require("express");
const router = express.Router();

// middleware
const { hashPassword } = require("../../../services/auth");

// controllers
const { browse, addApply, add } = require("../../../controllers/userActions");

router.get("", browse);
router.post("/:userId/applications/:offerId", addApply);
router.post("/", hashPassword, add);

module.exports = router;
