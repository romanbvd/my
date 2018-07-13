var redis = require('libs/redis');
var log = require('libs/log')(module);

class Campaign{

    static get REDIS_KEY(){return "_campaign";};

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

    static getCampaignById(id){
        return new Promise((resolve, reject) => {
            Campaign.REDIS.get(id + Campaign.REDIS_KEY, function (err, reply) {
                if (!reply || err) {
                    log.error('Campaign "' + id + '" not found in cache');
                    return reject(err);
                }

                resolve(new Campaign(JSON.parse(reply)));
            });
        });
    }
}

Campaign.REDIS = redis;

module.exports = Campaign;