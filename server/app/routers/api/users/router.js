const express = require("express");
const router = express.Router();

// middleware
const { hashPassword, verifyToken } = require("../../../services/auth");
const uploadCv = require("../../../services/uploadCv");
const uploadPicture = require("../../../services/uploadProfilPic");

// controllers
const {
  browse,
  readById,
  readApplications,
  readBoomarks,
  editPicture,
  addApply,
  add,
  addBookmark,
  destroyApplication,
  destroyBookmark,
} = require("../../../controllers/userActions");

router.get("", browse);
router.get("/:userId", readById);
router.put("/:userId", uploadPicture, editPicture);
router.get("/:userId/applications", readApplications);
router.get("/:userId/bookmarks", readBoomarks);
router.post("/:userId/applications/:offerId", uploadCv, addApply);
router.post("/:userId/bookmarks/:offerId", addBookmark);
router.post("/", hashPassword, add);
router.delete("/:userId/applications/:offerId", destroyApplication);
router.delete("/:userId/bookmarks/:offerId", destroyBookmark);

module.exports = router;
