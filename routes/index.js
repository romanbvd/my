var express = require('express');

var Consumer = require('libs/BaseConsumer');
//var ampq_lib = require('libs/ampq_test');
var router = express.Router();

var Filters = require('models/filters/Filters');
var Click = require('models/Click');

/* GET home page. */
router.get('/', function(req, res, next) {

    Filters.validateSubscription(req.query.guid, function(err, subscription){
        if(err){
            console.log('s')
            res.render('not_available_campaign', {'hide_branding': 0, 'code' : ''});
            return;
        }
console.log('zzz');
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
