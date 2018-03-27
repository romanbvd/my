var async = require('async');
var express = require('express');

var User = require('models/User');
var Subscription = require('models/redis/Subscription');
var Consumer = require('libs/BaseConsumer');
var router = express.Router();

var Filters = require('models/filters/Filters');
var Click = require('models/Click');

/* GET home page. */
router.get('/', function(req, res, next) {
    async.parallel({
            user: function (callback) {
                User.getUserByRequest(req, callback);
            },
            subscription: function (callback) {
                Subscription.getSubscriptionById(req.query.guid, callback);
            }
        },
        function(err, results){
            if(err) throw err;

            Filters.validate(results.user, results.subscription, function(err, subscription){
                var click = new Click(results.user, results.subscription);

                if(err) {
                    click.saveStopClick(function(){
                        return next(err);
                    });
                }else {
                    click.saveClick(function () {
                        res.render('index', {title: 'mmm'});
                    });
                }
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
