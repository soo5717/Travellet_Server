var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

// Router 추가
router.use('/users', require('./users'));
router.use('/travels', require('./travels'));
router.use('/likes', require('./placeLikes'));
router.use('travels/:travelid/plans', require('./plans')); //plan

module.exports = router;
