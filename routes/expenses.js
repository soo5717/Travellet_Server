var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const expenseController = require('../controllers/expenseController');

// [POST] 지출 추가
router.post('/', checkToken, expenseController.createExpense);
// [GET] 지출 목록 조회
router.get('/', checkToken, expenseController.readExpense);
// [PUT] 지출 수정
router.put('/:id', checkToken, expenseController.updateExpense);
// [DELETE] 지출 삭제
router.delete('/:id', checkToken, expenseController.deleteExpense);

module.exports = router;