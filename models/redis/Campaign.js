var redis = require('libs/redis');
var log = require('libs/log')(module);

class Campaign{
    constructor(data){
        this._data = (typeof data == 'object') ? data : {};
    }

    getTitle(){
        return this._data.title || '';
    }

    getAdvertiserId(){
        return this._data.advertiser || '';
    }

    getPayout(){
        return this._data.payouts || [];
    }

    isIncent(){
        return this._data.incent == '1';
    }

    static getCampaignById(id, callback){
        Campaign.REDIS.get(id + "_campaign", function(err, reply) {
            if(!reply || err) {
                log.error('Campaign "' + id + '" not found in cache');
                return callback(err);
            }
            callback(null, new Campaign(JSON.parse(reply)));
        });
    }
}

Campaign.REDIS = redis;

module.exports = Campaign;