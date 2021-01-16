var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const budgetController = require('../controllers/budgetController');

// [POST] 예산 추가
router.post('/', checkToken, budgetController.createBudget);
// [PUT] 예산 수정
router.patch('/:id', checkToken, budgetController.updateBudget);
// [DELETE] 예산 삭제
router.delete('/:id', checkToken, budgetController.deleteBudget);

module.exports = router;