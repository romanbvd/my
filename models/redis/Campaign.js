var redis = require('libs/redis');

function Campaign(data){
    this._data = (typeof data == 'object') ? data : {};
}

Campaign.prototype.getTitle = function(){
    return this._data.title || '';
};

Campaign.prototype.getAdvertiserId = function(){
    return this._data.adv_campaign_id || '';
};

Campaign.getCampaignById = function(id, callback){
    redis.get(id + "_campaign", function(err, reply) {
        if(err) callback(err);

        callback(null, new Campaign(JSON.parse(reply)));
    });
};

module.exports = Campaign;