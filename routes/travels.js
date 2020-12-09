var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const travelController = require('../controllers/travelController');

// [POST] 여행 생성
router.post('/', checkToken, travelController.createTravel);

// [GET] 여행 삭제
router.delete('/', checkToken, travelController.deleteTravel);

module.exports = router;