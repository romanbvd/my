const GeoLocation = require('models/redis/GeoLocation');
const FilterException = require('models/filters/FilterException');

const ERR_MESSAGE = 'ISP is black-listed';
const ERR_CODE = 203;

class IspFilter{
    static check(userModel, subscription){
        return new Promise((resolve, reject) => {
            GeoLocation.getBlaclistedIsp().then(
                result => {
                    if(!result.length) {
                        resolve();
                    }

                    let userProvider = userModel.getIsp();
                    if(result.indexOf(userProvider) != -1){
                        return reject(new FilterException(ERR_CODE, ERR_MESSAGE));
                    }

                    resolve();
                },
                error => {
                    reject(error);
                }
            );
        });
    }
}

module.exports = IspFilter;