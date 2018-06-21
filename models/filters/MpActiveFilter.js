const MediaProperty = require('models/redis/MediaProperty');
const FilterException = require('models/filters/FilterException');

const ERR_MESSAGE = 'MP is not approved';
const ERR_CODE = 110;

class MpActiveFilter{
    static check(userModel, subscription){
        return new Promise((resolve, reject) => {
            let advertiserId = subscription.getCampaign().getAdvertiserId();

            if(subscription.getMediaProperty().getStatus() != MediaProperty.STATUS_APPROVED){
                return reject(new FilterException(ERR_CODE, ERR_MESSAGE), null);
            }

            return resolve();
        });
    }
}

module.exports = MpActiveFilter;