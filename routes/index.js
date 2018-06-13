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
            Filters.validate(user, subscription, function(err){
                let click = new Click(user, subscription);

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
        },
        error => {
            if(err) return next(error);
        }

    );
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
