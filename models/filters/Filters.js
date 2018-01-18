var async = require('async');

var Subscription = require('models/redis/Subscription');

var IspFilter = require('models/filters/IspFilter');
var MpExistsFilter = require('models/filters/MpExistsFilter');
var MpActiveFilter = require('models/filters/MpActiveFilter');

function Filters(){
}

Filters.validateSubscription = function(id, callbackGeneral) {
    async.waterfall([
        function (callback){
            Subscription.getSubscriptionById(id, function(err, subscription) {
                callback(err, subscription)
            });
        },
        MpExistsFilter,
        MpActiveFilter,
        //IspFilter,
    ],
    callbackGeneral);
};


module.exports = Filters;