let express = require('express'),
  router = express.Router();
const fileController = require('./fileController');

router.post('/uploadFiles', fileController.uploadFile);

router.get('/getFiles', fileController.getFileList);

module.exports = router;
