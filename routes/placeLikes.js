var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const placeLikeController = require('../controllers/placeLikeController');

// [POST] 좋아요한 장소 추가
router.post('/', checkToken, placeLikeController.createPlaceLike);
// [GET] 좋아요한 장소 목록 조회
router.get('/', checkToken, placeLikeController.readPlaceLike);
// [DELETE] 좋아요한 장소 삭제
router.delete('/', checkToken, placeLikeController.deletePlaceLike); 

module.exports = router;