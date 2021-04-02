const fs = require('fs');
const path = require('path');
let multer = require('multer');
const fileUpload = require('./storage');

exports.uploadFile = function (req, res) {
  let upload = multer({
    storage: fileUpload.files.storage(),
    fileFilter: fileUpload.files.fileFilter,
  }).array('csvCollection', 15);
  upload(req, res, function (err) {
    // console.log(err);
    if (err === 'Only .csv format allowed!') {
      res.status(403).send('Only .csv format allowed!');
    } else {
      res.status(200).json({
        message: 'Upload Success!',
      });
    }
  });
};

exports.getFileList = function (req, res) {
  try {
    let html = [];
    let files = fs.readdirSync(path.join(__dirname, '/files/'));
    files.forEach((file) => {
      file = file.split(':::');
      html.push(file[1]);
    });
    res.status(200).json({
      message: 'File list retrieved successfully!',
      data: html,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(404).json({
      message: 'File list retrival failed',
      data: e,
    });
  }
};
