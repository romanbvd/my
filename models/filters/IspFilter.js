var GeoLocation = require('models/redis/GeoLocation');
var FilterException = require('models/filters/FilterException');

var ERR_MESSAGE = 'ISP is black-listed';
var ERR_CODE = 203;

function IspFilter(user, subscription, callback){
    let promise = GeoLocation.getBlaclistedIsp().then(
        result => {
            if(!result.length) {
                callback(null, user, subscription);
            }

            var userProvider = user.getIsp();
            if(result.indexOf(userProvider) != -1){
                return callback(new FilterException(ERR_CODE, ERR_MESSAGE), null);
            }

            callback(null, user, subscription);
        },
        error => {
            return callback(error, null);
        }
    );
}

module.exports = IspFilter;