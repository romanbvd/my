var express = require('express');
var async = require('async');
var redis = require('libs/redis');

var router = express.Router();

var Campaign = require('models/base/Campaign');
var MediaProperty = require('models/base/MediaProperty');

/* GET home page. */
router.get('/', function(req, res, next) {
    redis.get("557867ac4e8fb404458b456e_campaign", function(err, reply) {
        // reply is null when the key is missing
        console.log(reply);
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
