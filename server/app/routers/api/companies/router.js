const express = require("express");

const router = express.Router();

// controllers
const {
  browse,
  read,
  readOffers,
} = require("../../../controllers/companyActions");

router.get("", browse);
router.get("/:id", read);
router.get("/:id/offers", readOffers);

module.exports = router;
