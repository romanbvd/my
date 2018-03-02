var GeoLocation = require('models/redis/GeoLocation');

var ERR_MESSAGE = 'ISP is black-listed';
var ERR_CODE = 203;

function IspFilter(user, subscription, callback){
    GeoLocation.getBlaclistedIsp(function(err, data){
        console.log(err);console.log(data);
    });
}

module.exports = IspFilter;