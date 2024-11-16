const multer = require("multer");

const storage = multer.diskStorage({
  // destination: function (_req, _file, cb) {
  //   cb(null, "uploads/");
  // },
  // filename: function (req, file, cb) {
  //   cb(
  //     null,
  //     new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
  //   );
  // },
});

function fileFilter(_req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/bmp" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 100 * 1024 * 1024, // 5 MB limit
  // },
});
/*
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};
*/
//module.exports = { upload, fileSizeFormatter };
module.exports = upload;
