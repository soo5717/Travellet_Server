var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const travelController = require('../controllers/travelController');

// [POST] 여행 생성
router.post('/', checkToken, travelController.createTravel);

module.exports = router;