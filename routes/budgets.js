var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const budgetController = require('../controllers/budgetController');

// [GET] 예산 분배 조회
router.get('/distribution', checkToken, budgetController.readBudgetDistribution);
// [PATCH] 예산 분배
router.patch('/distribution', checkToken, budgetController.updateBudgetDistribution);

// [POST] 예산 추가
router.post('/', checkToken, budgetController.createBudget);
// [GET] 예산 내용 조회
router.get('/:id', checkToken, budgetController.readBudgetDetail);
// [PUT] 예산 수정
router.patch('/:id', checkToken, budgetController.updateBudget);
// [DELETE] 예산 삭제
router.delete('/:id', checkToken, budgetController.deleteBudget);

module.exports = router;