var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const travelController = require('../controllers/travelController');

// [POST] 여행 추가
router.post('/', checkToken, travelController.createTravel);
// [GET] 여행 목록 조회
router.get('/', checkToken, travelController.readTravel);
// [DELETE] 여행 삭제
router.delete('/:id', checkToken, travelController.deleteTravel);

module.exports = router;