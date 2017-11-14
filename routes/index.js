var express = require('express');
var async = require('async');
var redis = require('redis');
var client = redis.createClient();

var router = express.Router();

var Campaign = require('models/redis/Campaign');
var Subscription = require('models/redis/Subscription');
var MediaProperty = require('models/base/MediaProperty');


/* GET home page. */
router.get('/', function(req, res, next) {
    Subscription.getSubscriptionById("55caf7ec4e8fb45c0b8b4643", function(err, subscription) {
        if(err)next();

        // reply is null when the key is missing
        console.log(subscription.getTitle());
        res.render('index', { title: '/' });
    });
/*
    async.parallel([
        function(callback) {
            MediaProperty.findOne({readable_id: 1162}, function (err, docs) {
                callback(err, docs);
            });
        },
        function(callback) {
            Campaign.findOne({readable_id: 1162}, function (err, docs) {
                callback(err, docs);
            });
        }
    ], function(err, results) {
        if(err) throw err;
        console.log(results);
        res.render('index', { title: '/' });
    });*/

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
