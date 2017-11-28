var express = require('express');
var redis = require('libs/redis');

var router = express.Router();

var Filters = require('models/filters/Filters');
var Click = require('models/Click');

/* GET home page. */
router.get('/', function(req, res, next) {
    Filters.validateSubscription(req.query.guid, function(err, subscription){
        if(!err){
            //!!!!!!!!!!!!!!!!!!!!!!!!!
        }

        var click = new Click(null, subscription);
        click.saveClick();
        console.log(click.getClickInfo());
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
