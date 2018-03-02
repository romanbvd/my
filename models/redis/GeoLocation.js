var util = require('util');
var redis = require('libs/redis');
var IpHelper = require('libs/helpers/IpHelper');

function GeoLocationException(code, message){
    this.message = message;
    this.code = code;
}

util.inherits(GeoLocationException, Error);

function GeoLocation(){

}

GeoLocation.CITY_KEY = 'ip_cities';
GeoLocation.COUNTRY_KEY = 'ip_countries';
GeoLocation.ISP_KEY = 'ip_isp';
GeoLocation.ISP_BLACKLISTED = 'isp_black';

GeoLocation.getCountryByIp = function(ip, callback){
    this.getZrangeValue(GeoLocation.COUNTRY_KEY, ip, callback);
};

GeoLocation.getCityByIp = function(ip, callback){
    this.getZrangeValue(GeoLocation.CITY_KEY, ip, callback);
};

GeoLocation.getProviderByIp = function(ip, callback){
    this.getZrangeValue(GeoLocation.ISP_KEY, ip, callback);
};

GeoLocation.getBlaclistedIsp = function(callback){
    redis.lrange(GeoLocation.ISP_KEY, 0, -1, callback);
};

GeoLocation.getZrangeValue = function(key, ip, callback){
    redis.zrangebyscore(key, IpHelper.convertIpToDecimal(ip), 4294967296, 'limit', 0, 1, function(err, reply){
        if(err){
            return callback(new GeoLocationException(403, 'Resolving "' + ip + '" error'));
        }

        if(!reply){
            return callback(new GeoLocationException(403, 'Resolving "' + ip + '" error'));
        }

        if(reply.length == 0){
            return callback(null, '');
        }

        var result = reply.pop();
        var result = result.split('_');

        callback(null, result[0].toLowerCase());
    });
};

module.exports = GeoLocation;