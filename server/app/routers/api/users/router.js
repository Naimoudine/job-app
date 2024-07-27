const express = require("express");
const router = express.Router();

// controllers
const {browse} = require("../../../controllers/userActions");

router.get("", browse);


module.exports = router;