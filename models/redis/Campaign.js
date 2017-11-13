var redis = require('redis');
var client = redis.createClient();


function Campaign(data){
    this._campaignData = (typeof data == 'object') ? data : {};
}

Campaign.prototype = function getTitle(){
    return this._campaignData.title ? this._campaignData.title : '';
};

Campaign.getCampaignById = function(id, callback){
    client.get(id + "_campaign", function(err, reply) {
        if(err) callback(err);

        callback(null, new Campaign(JSON.parse(reply)));
    });
};

module.exports = Campaign;