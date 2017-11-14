var redis = require('redis');
var client = redis.createClient();

var Campaign = require('models/redis/Campaign');
var MediaProperty = require('models/base/MediaProperty');

function Subscription(data){
    this._data = (typeof data == 'object') ? data : {};

    this._campaign = null;
    this._media_property = null;
    this._publisher = null;
}

Subscription.prototype.getCampaignId = function(){
    return this._data.campaign_id || '';
};

Subscription.prototype.getCampaign = function(){

};

Subscription.prototype.getCampaign = function(){

};

Subscription.prototype.getCampaign = function(){

};

Subscription.getSubscriptionById = function(id, callback){
    client.hget('subscriptions_hash', id, function(err, reply) {
        if(err) callback(err);
        var res = new Subscription(JSON.parse(reply));
        console.log(res);
        callback(null, new Subscription(JSON.parse(reply)));
    });
};

module.exports = Subscription;