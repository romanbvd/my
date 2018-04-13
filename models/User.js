var async = require('async');

var MobileDetect = require('mobile-detect');
var GeoLocation = require('models/redis/GeoLocation');

function User(){
    this._ip = '';
    this._isp = '';
    this._country = '';
    this._city = '';
    this._query_params = '';
    this.user_agent = '';

    this._mobile_detective = null;
}

User.prototype.init = function(req, callbackResult){
    that = this;

    this._query_params = req.query;
    this._user_agent = req.header('User-agent');

    this._mobile_detective = new MobileDetect(this._user_agent);
    this._mobile_detective.os();
    this._ip = req.connection.remoteAddress;
    this._ip = '176.36.10.243';
    //this._ip = '127.0.0.1';

    async.parallel({
        isp: function(callback) {
            GeoLocation.getProviderByIp(that._ip, callback);
        },
        country: function(callback) {
            GeoLocation.getCountryByIp(that._ip, callback);
        },
        city: function(callback) {
            GeoLocation.getCityByIp(that._ip, callback);
        }
    }, function(err, results) {
        if(err) throw err;

        that._isp = results.isp;
        that._country = results.country;
        that._city = results.city;

        callbackResult();
    });
};

User.prototype.getIp = function(){
    return this._ip;
};

User.prototype.getIsp = function(){
    return this._isp;
};

User.prototype.getCountry = function(){
    return this._country;
};

User.prototype.getCity = function(){
    return this._city;
};

User.prototype.getQueryParam = function(param, def){
    def = def || '';
    return this._query_params[param] || def;
};

//device properties
User.prototype.getUserAgent = function(){
    return this._user_agent || '';
};

User.prototype.getPlatform = function(){
    var mobile = this._mobile_detective.mobile();
    var os = this._mobile_detective.os();

    if(!mobile){
        return 'desktop';
    }

    if(mobile == 'iPhone'){
        if(mobile.indexOf('iPod') != -1){
            return 'iPod';
        }
        return 'iPhone';
    }

    if(mobile == 'iPad'){
        return 'iPad';
    }

    if(os == 'AndroidOS'){
        return 'Android';
    }

    if(os == 'WindowsPhoneOS'){
        return 'wp';
    }

    return '';
};

User.prototype.getOsVersion = function(){
    return this._mobile_detective.version(this.getPlatform());
};

User.prototype.getDeviceType = function(){
    return this._mobile_detective.mobile() || '';
};

User.prototype.getPublisherParams = function(){
    var that = this;
    var keys = ['subid1', 'subid2', 'subid3', 'subid4', 'subid5', 'clickid', 'mpid'];

    var params = [];
    keys.forEach(function(item, i, arr){
        if(that.getQueryParam(item)) {
            params[item] = that.getQueryParam(item);
        }
    });

    return params;
};

User.getUserByRequest = function(req, callback){
    var user = new User();
    user.init(req, function(){
        callback(null, user);
    });
};

module.exports = User;