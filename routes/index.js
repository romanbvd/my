var express = require('express');
var redis = require('libs/redis');

var router = express.Router();
var Filters = require('models/filters/Filters');

/* GET home page. */
router.get('/', function(req, res, next) {
    Filters.validateSubscription('55deba954e8fb4de598b45e9', function(err, result){
        console.log(err);
        res.render('index', { title: 'sss'});
    });

});

router.get('/first_click/:id', function(req, res, next) {
    res.render('index', { title: req.params.id});
});

router.get('/callback', function(req, res, next) {
    res.render('index', { title: 'callback' });
});

router.get('/rejection', function(req, res, next) {
    res.render('index', { title: 'rejection' });
});

router.get('/event', function(req, res, next) {
    res.render('index', { title: 'event' });
});

router.get('/smartlink', function(req, res, next) {
    res.render('index', { title: 'smartlink' });
});

router.get('/smartlink_redirect', function(req, res, next) {
    res.render('index', { title: 'smartlink' });
});

module.exports = router;
