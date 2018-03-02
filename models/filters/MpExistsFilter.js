var FilterException = require('models/filters/FilterException');

var ERR_MESSAGE = 'MP absent';
var ERR_CODE = 118;

function MpExistsFilter(user, subscription, callback){
    var mp = subscription.getMediaProperty();

    if(!mp || mp.getMediaPropertyId() == undefined){
        return callback(new FilterException(ERR_CODE, ERR_MESSAGE), null);
    }

    callback(null, user, subscription);
};

module.exports = MpExistsFilter;