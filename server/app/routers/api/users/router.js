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
  addBookmark,
  destroyApplication,
  destroyBookmark,
} = require("../../../controllers/userActions");

router.get("", browse);
router.get("/:userId", readById);
router.get("/:userId/applications", readApplications);
router.get("/:userId/bookmarks", readBoomarks);
router.post("/:userId/applications/:offerId", multerUpload, addApply);
router.post("/:userId/bookmarks/:offerId", addBookmark);
router.post("/", hashPassword, add);
router.delete("/:userId/applications/:offerId", destroyApplication);
router.delete("/:userId/bookmarks/:offerId", destroyBookmark);

module.exports = router;
