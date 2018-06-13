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
        Promise.all([
            Campaign.getCampaignById(this.getCampaignId()),
            MediaProperty.getMediaPropertyById(this.getMediaPropertyId()),
            Publisher.getPublisherById(this.getPublisherId())
        ]).then(([campaign, media_property, publisher]) => {
                this._campaign = campaign;
                this._media_property = media_property;
                this._publisher = publisher;
                callbackResult();
            },
            error => {
                callbackResult(error);
            }
        );
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

    static getSubscriptionById(id){
        return new Promise((resolve, reject) => {
            if (!id) {
                let msg = 'Subscription ID not defined';
                log.error(msg);
                return reject(new SubscriptionException(403, msg));
            }

            Campaign.REDIS.hget('subscriptions_hash', id, function (err, reply) {
                if (!reply || err) {
                    let msg = 'Subscription "' + id + '" not found in cache';
                    log.error(msg);
                    return reject(new SubscriptionException(403, msg));
                }

                let subscription = new Subscription(JSON.parse(reply));
                subscription._subscription_id = id;
                subscription.init(function (err) {
                    if(err){
                        reject(err);
                    }else {
                        resolve(subscription);
                    }
                });
            });
        });
    }
}

Campaign.REDIS = redis;

module.exports = Subscription;