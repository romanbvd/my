var express = require('express');
var redis = require('libs/redis');

var router = express.Router();

var Subscription = require('models/redis/Subscription');

/* GET home page. */
router.get('/', function(req, res, next) {
    Subscription.getSubscriptionById("55deba954e8fb4de598b45e9", function(err, subscription) {
        // reply is null when the key is missing
        console.log(subscription);
        res.render('index', { title: '/' });
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
