var async = require('async');


var IspFilter = require('models/filters/IspFilter');
var MpExistsFilter = require('models/filters/MpExistsFilter');
var MpActiveFilter = require('models/filters/MpActiveFilter');

function Filters(){
}

Filters.validate = function(userModel, subscriptionModel, callbackGeneral) {
    async.waterfall([
        function(callback) {
            callback(null, userModel, subscriptionModel);
        },
        MpExistsFilter,
        MpActiveFilter,
       // IspFilter,
    ],
    callbackGeneral);
};


module.exports = Filters;