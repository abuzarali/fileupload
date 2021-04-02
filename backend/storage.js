let multer = require('multer');
const path = require('path');
module.exports.files = {
  storage: function () {
    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/files/'));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + ':::' + file.originalname);
      },
    });

    return storage;
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype == 'text/csv') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb('Only .csv format allowed!');
    }
  },
};
