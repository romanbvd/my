var async = require('async');

var Subscription = require('models/redis/Subscription');

var IspFilter = require('models/filters/IspFilter');
var MpActiveFilter = require('models/filters/MpActiveFilter');

function Filters(){
}

Filters.validateSubscription = function(id, callbackGeneral) {
    async.waterfall([
        function (callback){
            Subscription.getSubscriptionById(id, function(err, subscription) {
                callback(null, subscription)
            });
        },
        //IspFilter,
        MpActiveFilter,
    ],
    callbackGeneral);
};


module.exports = Filters;