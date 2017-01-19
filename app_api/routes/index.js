var express = require('express');
var router = express.Router();

var ctrlAnilist = require('../controllers/anilist');

router.get('/token', ctrlAnilist.getAccessToken);

router.post('/rate', ctrlAnilist.rateAnime);

router.get('/avg', ctrlAnilist.retrieveRatings);

router.get('/envvar', ctrlAnilist.getEnvVar);

module.exports = router;
