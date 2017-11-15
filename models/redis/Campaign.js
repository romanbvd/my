var redis = require('lib/redis');

function Campaign(data){
    this._data = (typeof data == 'object') ? data : {};
}

Campaign.prototype.getTitle = function(){
    return this._data.title || '';
};

Campaign.getCampaignById = function(id, callback){
    redis.get(id + "_campaign", function(err, reply) {
        if(err) callback(err);
        var res = new Campaign(JSON.parse(reply));
        console.log(res.getTitle());
        callback(null, new Campaign(JSON.parse(reply)));
    });
};

module.exports = Campaign;