var async = require('async');

var redis = require('libs/redis');
var util = require('util');

var log = require('libs/log')(module);

var Campaign = require('models/redis/Campaign');
var MediaProperty = require('models/redis/MediaProperty');
var Publisher = require('models/redis/Publisher');

function SubscriptionException(code, message){
    this.message = message;
    this.code = code;
}

util.inherits(SubscriptionException, Error);

class Subscription{
    constructor(data){
        this._data = (typeof data == 'object') ? data : {};

        this._subscription_id = '';
        this._campaign = null;
        this._media_property = null;
        this._publisher = null;
    }

    init(callbackResult) {
        var that = this;
        async.parallel({
            media_property: function(callback) {
                MediaProperty.getMediaPropertyById(that.getMediaPropertyId(), callback);
            },
            campaign: function(callback) {
                Campaign.getCampaignById(that.getCampaignId(), callback);
            },
            publisher: function(callback) {
                Publisher.getPublisherById(that.getPublisherId(), callback);
            }
        }, function(err, results) {
            if(err) return callbackResult(err);
            console.log(results.media_property);
            that._campaign = results.campaign;
            that._media_property = results.media_property;
            that._publisher = results.publisher;

            callbackResult();
        });
    }

    getSubscriptionId(){
        return this._subscription_id || '';
    }

    getCampaignId(){
        return this._data.campaign_id || '';
    }

    getCampaign(){
        return this._campaign;
    }

    getMediaPropertyId(){
        return this._data.media_property_id || '';
    }

    getMediaProperty(){
        return this._media_property;
    }

    getPublisherId(){
        return this._data.publisher_id || '';
    }

    getPublisher(){
        return this._publisher;
    }

    getPayoutInformation(platform, country, city){
        var payouts = this.getCampaign().getPayout();

        for(var i = 0; i < payouts.length; i++){
            if(payouts[i].platforms != platform.toLowerCase()){
                continue;
            }

            if(payouts[i].countries.indexOf(country) == -1){
                continue;
            }

            if(!city){
                return payouts[i];
            }

            if(payouts[i].countries.indexOf(country) == -1){
                continue;
            }

            return payouts[i];
        }

        return [];
    }

    static getSubscriptionById(id, callback){
        if(!id){
            var msg = 'Subscription ID not defined';
            log.error(msg);
            return callback(new SubscriptionException(403, msg));
        }

        Campaign.REDIS.hget('subscriptions_hash', id, function(err, reply) {
            if(!reply || err) {
                var msg = 'Subscription "' + id + '" not found in cache';
                log.error(msg);
                return callback(new SubscriptionException(403, msg));
            }
            var subscription = new Subscription(JSON.parse(reply));
            subscription._subscription_id = id;
            subscription.init(function(err){
                callback(null, subscription);
            });
        });
    }
}

Campaign.REDIS = redis;

module.exports = Subscription;