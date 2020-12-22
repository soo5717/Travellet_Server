var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

// Router 추가
router.use('/users', require('./users'));
router.use('/travels', require('./travels'));
router.use('/travels/:id/plans', require('./plans'));
router.use('/budgets', require('./budgets'));
router.use('/expenses', require('./expenses'));
router.use('/likes', require('./placeLikes'));

module.exports = router;
