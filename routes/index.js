let express = require('express');

let User = require('models/User');
let Subscription = require('models/redis/Subscription');
let Consumer = require('libs/BaseConsumer');
let router = express.Router();

let Filters = require('models/filters/Filters');
let Click = require('models/Click');

/* GET home page. */
router.get('/', function(req, res, next) {
    Promise.all([
        User.getUserByRequest(req),
        Subscription.getSubscriptionById(req.query.guid)
    ]).then(([user, subscription]) => {
        let click = new Click(user, subscription);
        Filters.validate(user, subscription).then(success => {
            click.saveClick(function () {
                res.render('index', {title: 'mmm'});
            });
        }).catch(reject => {
            click.saveStopClick(function(){
                return next(err);
            });
        });
    }).catch(error => {
        return next(error);
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
