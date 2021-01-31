var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const expenseController = require('../controllers/expenseController');

// [GET] 레포트 (일별, 카테고리별)
router.get('/report/:type', checkToken, expenseController.readReport);

// [POST] 지출 추가
router.post('/', checkToken, expenseController.createExpense);
// [GET] 지출 내용 조회
router.get('/:id', checkToken, expenseController.readExpenseDetail);
// [PUT] 지출 수정
router.patch('/:id', checkToken, expenseController.updateExpense);
// [DELETE] 지출 삭제
router.delete('/:id', checkToken, expenseController.deleteExpense);

module.exports = router;