var async = require('async');

var MpExistsFilter = require('models/filters/MpExistsFilter');
var MpActiveFilter = require('models/filters/MpActiveFilter');
var IspFilter = require('models/filters/IspFilter');

function Filters(){
}

Filters.validate = function(user, subscription, callbackGeneral) {
    Promise.all([
        MpExistsFilter.check(user, subscription),
        MpActiveFilter.check(user, subscription),
        IspFilter.check(user, subscription),
    ]).then(success => {
        callbackGeneral()
        }, error => {

        });


};


module.exports = Filters;