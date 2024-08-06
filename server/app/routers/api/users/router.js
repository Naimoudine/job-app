const express = require("express");
const router = express.Router();

// middleware
const { hashPassword, verifyToken } = require("../../../services/auth");
const multerUpload = require("../../../services/multer");

// controllers
const {
  browse,
  readById,
  readApplications,
  readBoomarks,
  addApply,
  add,
} = require("../../../controllers/userActions");

router.get("", browse);
router.get("/:id", readById);
router.get("/:id/applications", readApplications);
router.get("/:id/bookmarks", readBoomarks);
router.post("/:userId/applications/:offerId", multerUpload, addApply);
router.post("/", hashPassword, add);

module.exports = router;
