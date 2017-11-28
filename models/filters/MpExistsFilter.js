var FilterException = require('models/filters/FilterException');

var ERR_MESSAGE = 'MP absent';
var ERR_CODE = 118;

function MpExistsFilter(subscription, callback){
    var mp = subscription.getMediaProperty();

    err = null;
    if(!mp || mp.getMediaPropertyId() == undefined){
        err = new FilterException(ERR_CODE, ERR_MESSAGE);
    }

    callback(err, subscription);
};

module.exports = MpExistsFilter;