// modules
const multer = require("multer");
const path = require("path");



exports.uploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/imagenes");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}-.${file.mimetype.slice(6)}`);
    },
  }),
});
