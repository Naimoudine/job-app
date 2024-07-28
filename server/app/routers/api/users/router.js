const express = require("express");
const router = express.Router();

// controllers
const {browse, addApply} = require("../../../controllers/userActions");

router.get("", browse);
router.post("/:userId/applications/:offerId", addApply);


module.exports = router;