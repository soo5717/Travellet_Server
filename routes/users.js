var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const userController = require('../controllers/userController');

// [POST] 회원가입 
router.post('/signup', userController.signUp);
// [POST] 로그인
router.post('/signin', userController.signIn);

// [GET] 프로필 조회
router.get('/', checkToken, userController.readProfile);
// [PUT] 프로필 수정
router.patch('/', checkToken, userController.updateProfile);
// [DELETE] 회원 탈퇴
router.delete('/', checkToken, userController.deleteProfile);

module.exports = router;
