var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const planController = require('../controllers/planController');

// [GET] 일정 조회
router.get('/', checkToken, planController.readPlan);

module.exports = router;