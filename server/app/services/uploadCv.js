const path = require("node:path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "public"));
  },
  filename(req, file, cb) {
    if (file) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  },
});

const upload = multer({ storage }).single("file");

module.exports = upload;
