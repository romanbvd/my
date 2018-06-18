var FilterException = require('models/filters/FilterException');

var ERR_MESSAGE = 'MP absent';
var ERR_CODE = 118;

class MpExistsFilter{
    static check(userModel, subscription){
        return new Promise((resolve, reject) => {
            let mp = subscription.getMediaProperty();

            if (!mp || mp.getMediaPropertyId() == undefined) {
                return reject(new FilterException(ERR_CODE, ERR_MESSAGE));
            }

            resolve();
        });
    }
};

module.exports = MpExistsFilter;