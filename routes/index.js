var express = require('express');
var router = express.Router();

router.use('/api/register', require('../service/register').router);
router.use('/api/retrieve', require('../service/retrieve').router);
router.use('/api/commonstudents', require('../service/commonstudents').router);
router.use('/api/suspend', require('../service/suspend').router);
router.use('/api/retrievefornotifications', require('../service/retrievefornotifications').router);

// application -------------------------------------------------------------
router.get('/', function (req, res) {
    res.render('index', {title: 'API'});
});

module.exports = router;