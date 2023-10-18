const router = require('express').Router();

const upload = require('../config/multer.config.js');
const { uploadAvatar } = require('../controller/upload.controller.js');

router.post('/avatar', upload.single("file"), uploadAvatar);

module.exports = router;