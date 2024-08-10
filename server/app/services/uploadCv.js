const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "public"));
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, Date.now() + "-" + file.originalname);
    } else {
      return;
    }
  },
});

const upload = multer({ storage: storage }).single("file");

module.exports = upload;
