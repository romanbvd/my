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

GeoLocation.getCountryByIp = function(ip){
    that = this;
    return new Promise((resolve, reject) => {
        that.getZrangeValue(GeoLocation.COUNTRY_KEY, ip, function (err, reply) {
            if (err) {
                return reject(err);
            }

            resolve(reply);
        });
    });
};

GeoLocation.getCityByIp = function(ip){
    that = this;
    return new Promise((resolve, reject) => {
        that.getZrangeValue(GeoLocation.CITY_KEY, ip, function(err, reply){
            if(err){
                return reject(err);
            }

            resolve(reply);
        });
    });
};

GeoLocation.getProviderByIp = function(ip){
    that = this;
    return new Promise((resolve, reject) => {
        that.getZrangeValue(GeoLocation.ISP_KEY, ip, function(err, reply){
            if(err){
                return reject(err);
            }

            resolve(reply);
        });
    });

};

GeoLocation.getBlaclistedIsp = function(){
    return new Promise((resolve, reject) => {
        redis.lrange(GeoLocation.ISP_BLACKLISTED, 0, -1, function(err, reply){
            if(err){
                return reject(err);
            }

            resolve(reply);
        });
    });
};

GeoLocation.getZrangeValue = function(key, ip, callback){
    redis.zrangebyscore(key, IpHelper.convertIpToDecimal(ip), 4294967296, 'limit', 0, 1, function(err, reply){
        if(err){
            return callback(new GeoLocationException(403, 'Resolving "' + ip + '" ip'));
        }

        if(!reply){
            return callback(new GeoLocationException(403, 'Resolving "' + ip + '" ip'));
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