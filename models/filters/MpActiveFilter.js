var MediaProperty = require('models/redis/MediaProperty');
var FilterException = require('models/filters/FilterException');

var ERR_MESSAGE = 'MP is not approved';
var ERR_CODE = 110;

function MpActiveFilter(user, subscription, callback){
    var advertiserId = subscription.getCampaign().getAdvertiserId();

    if(subscription.getMediaProperty().getStatus() != MediaProperty.STATUS_APPROVED){
            return callback(new FilterException(ERR_CODE, ERR_MESSAGE), null);
    }

    return callback(null, user, subscription);
}

module.exports = MpActiveFilter;