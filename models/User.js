var GeoLocation = require('libs/redis/GeoLocation');

function User(){
    this._ip = '';
    this._isp = '';
    this._country = '';
    this._city = '';
    this._params = '';
}

User.prototype.init = function(req){
    that = this;
    this._ip = req.connection.remoteAddress;
    this._params = '';
    async.parallel({
        isp: function(callback) {
            GeoLocation.getProviderByIp(that._ip, function (err, campaign) {
                callback(err, campaign);
            });
        },
        country: function(callback) {
            GeoLocation.getCountryByIp(that._ip, function (err, mediaProperty) {
                callback(err, mediaProperty);
            });
        },
        city: function(callback) {
            GeoLocation.getCityByIp(that._ip, function (err, publisher) {
                callback(err, publisher);
            });
        }
    }, function(err, results) {
        if(err) throw err;

        that._isp = results.isp;
        that._country = results.country;
        that._city = results.city;

        callbackResult();
    });
};

module.exports = User;