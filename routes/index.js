var express = require('express');

var Subscription = require('models/redis/Subscription');
var Consumer = require('libs/BaseConsumer');
//var ampq_lib = require('libs/ampq_test');
var router = express.Router();

var Filters = require('models/filters/Filters');
var Click = require('models/Click');

/* GET home page. */
router.get('/', function(req, res, next) {

    var client = '';
    var subscription = '';
    console.log(req.connection.remoteAddress);
    res.render('index', { title: 'mmm'});
    return;
    Subscription.getSubscriptionById(id, function(err, subscription) {
        callback(err, subscription)
    });

    Filters.validateSubscription(req.query.guid, function(err, subscription){
        if(err) return next(err);
console.log(res.connection);
        var click = new Click(null, subscription);
        click.saveClick(function(){
            res.render('index', { title: 'mmm'});
        });
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
