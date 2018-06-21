const FilterException = require('models/filters/FilterException');

const ERR_MESSAGE = 'MP absent';
const ERR_CODE = 118;

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