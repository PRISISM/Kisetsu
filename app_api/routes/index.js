var express = require('express');
var router = express.Router();

var ctrlAnilist = require('../controllers/anilist');

router.get('/token', ctrlAnilist.getAccessToken);

module.exports = router;
