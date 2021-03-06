var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const planController = require('../controllers/planController');

// [POST] 일정 추가
router.post('/', checkToken, planController.createPlan);
// [GET] 일정 조회
router.get('/:id', checkToken, planController.readPlanDetail);
// [GET] 일정 목록 조회
router.get('/', checkToken, planController.readPlan);
// [PUT] 일정 수정
router.put('/:id', checkToken, planController.updatePlan)
//[DELETE] 일정 삭제
router.delete('/:id', checkToken, planController.deletePlan);

//[POST] 교통비 측정
router.post('/:id', checkToken, planController.calculateTransport);

module.exports = router;