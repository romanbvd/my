var async = require('async');
var GeoLocation = require('models/redis/GeoLocation');

function User(){
    this._ip = '';
    this._isp = '';
    this._country = '';
    this._city = '';
    this._params = '';
}

User.prototype.init = function(req, callbackResult){
    that = this;
    this._ip = req.connection.remoteAddress;
    this._ip = '176.36.10.243';
    //this._ip = '127.0.0.1';
    this._params = '';

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

User.getUserByRequest = function(req, callback){
    var user = new User();
    user.init(req, function(){
        callback(null, user);
    });
};

module.exports = User;