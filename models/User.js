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
    this._query_params = req.query;
    this._user_agent = req.header('User-agent');

    this._mobile_detective = new MobileDetect(this._user_agent);
    this._mobile_detective.os();
    this._ip = req.connection.remoteAddress;
    this._ip = '176.36.10.243';
    //this._ip = '127.0.0.1';

    Promise.all([
        GeoLocation.getProviderByIp(this._ip),
        GeoLocation.getCountryByIp(this._ip),
        GeoLocation.getCityByIp(this._ip)
    ]).then(results => {
            this._isp = results[0];
            this._country = results[1];
            this._city = results[2];

            callbackResult();
        },
        error => {
            callbackResult(error);
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

User.prototype.getQueryString = function(){
    return this._query_params;
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
    let that = this;
    let keys = ['subid1', 'subid2', 'subid3', 'subid4', 'subid5', 'clickid', 'mpid'];

    let params = [];
    keys.forEach(function(item, i, arr){
        if(that.getQueryParam(item)) {
            params[item] = that.getQueryParam(item);
        }
    });

    return params;
};

User.prototype.getReferrer = function(){

};

User.getUserByRequest = function(req){
    return new Promise((resolve, reject) => {
        let user = new User();
        user.init(req, function(error){
            if(!error){
                resolve(user);
            }else{
                reject(error);
            }
        });
    });
};

module.exports = User;