var async = require('async');

var redis = require('libs/redis');
var util = require('util');

var Campaign = require('models/redis/Campaign');
var MediaProperty = require('models/redis/MediaProperty');
var Publisher = require('models/redis/Publisher');

function SubscriptionException(code, message){
    this.message = message;
    this.code = code;
}

util.inherits(SubscriptionException, Error);

function Subscription(data){
    this._data = (typeof data == 'object') ? data : {};

    this._campaign = null;
    this._media_property = null;
    this._publisher = null;
}

Subscription.prototype.init = function (callbackResult) {
    var that = this;
    async.parallel({
        media_property: function(callback) {
            MediaProperty.getMediaPropertyById(that.getMediaPropertyId(), function (err, mediaProperty) {
                callback(err, mediaProperty);
            });
        },
        campaign: function(callback) {
            Campaign.getCampaignById(that.getCampaignId(), function (err, campaign) {
                callback(err, campaign);
            });
        },
        publisher: function(callback) {
            Publisher.getPublisherById(that.getPublisherId(), function (err, publisher) {
                callback(err, publisher);
            });
        }
    }, function(err, results) {
        if(err) throw err;

        that._campaign = results.campaign;
        that._media_property = results.media_property;
        that._publisher = results.publisher;

        callbackResult();
    });
};

Subscription.prototype.getSubscriptionId = function(){
    return this._data.campaign_id || '';
};

Subscription.prototype.getCampaignId = function(){
    return this._data.campaign_id || '';
};

Subscription.prototype.getCampaign = function(){
    return this._campaign;
};

Subscription.prototype.getMediaPropertyId = function(){
    return this._data.media_property_id || '';
};

Subscription.prototype.getMediaProperty = function(){
    return this._media_property;
};

Subscription.prototype.getPublisherId = function(){
    return this._data.publisher_id || '';
};

Subscription.prototype.getPublisher = function(){
    return this._publisher;
};

Subscription.getSubscriptionById = function(id, callback){
    redis.hget('subscriptions_hash', id, function(err, reply) {
        if(!reply || err) {
            callback(new SubscriptionException(403, 'Subscription "' + id + '" not found'));
            return;
        }

        var subscription = new Subscription(JSON.parse(reply));
        subscription.init(function(){
            callback(null, subscription);
        });
    });
};

module.exports = Subscription;