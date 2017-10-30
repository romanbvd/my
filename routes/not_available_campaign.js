var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.param('$hide_branding'));
    res.render('not_available_campaign', {
        hide_branding: req.param('hide_branding'),
        code: req.param('code')
    });
});

module.exports = router;