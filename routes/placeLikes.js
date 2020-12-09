var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const placeLikeController = require('../controllers/placeLikeController');

// [POST] 좋아요한 장소 추가
router.post('/', checkToken, placeLikeController.createPlaceLike);

module.exports = router;