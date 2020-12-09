var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const travelController = require('../controllers/travelController');

// [POST] 여행 생성
router.post('/', checkToken, travelController.createTravel);

// [DELETE] 여행 삭제
router.delete('/', checkToken, travelController.deleteTravel);

// [GET] 여행 목록 불러오기
router.get('/', checkToken, travelController.getTravel);

module.exports = router;