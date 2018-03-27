var GeoLocation = require('models/redis/GeoLocation');
var FilterException = require('models/filters/FilterException');

var ERR_MESSAGE = 'ISP is black-listed';
var ERR_CODE = 203;

function IspFilter(user, subscription, callback){
    GeoLocation.getBlaclistedIsp(function(err, blaclistedIsps){
        if(err){
            return callback(err, null);
        }

        if(blaclistedIsps.length) {
            var userProvider = user.getIsp();
            if(blaclistedIsps.indexOf(userProvider) != -1){
                return callback(new FilterException(ERR_CODE, ERR_MESSAGE), null);
            }
        }

        callback(null, user, subscription);
    });
}

module.exports = IspFilter;