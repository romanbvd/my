var FilterException = require('models/filters/FilterException');

var ERR_MESSAGE = 'MP is blocked for advertiser';
var ERR_CODE = 115;

function MpActiveFilter(subscription, callback){
    var advertiserId = subscription.getCampaign().getAdvertiserId();

    subscription.getMediaProperty().isBlockedForAdvertiser(advertiserId, function(err, result){
        if(result == true){
            err = new FilterException(ERR_CODE, ERR_MESSAGE);
        }

        callback(err, subscription);
    });
};

module.exports = MpActiveFilter;