var redis = require('libs/redis');

function MediaProperty(data){
    this._data = (typeof data == 'object') ? data : {};
}

MediaProperty.prototype.getName = function(){
    return this._data.name || '';
};

MediaProperty.prototype.getMediaPropertyId = function(){
    return this._data._id || '';
};

MediaProperty.prototype.isBlockedForAdvertiser = function(advertiser_id, callback){
    console.log(this.getMediaPropertyId() + '_' + advertiser_id);
    redis.get(this.getMediaPropertyId() + '_' + advertiser_id + '_blocked_mp', function(err, reply) {
        if(err) callback(err);

        var result = (reply == null) ? false : true;
        callback(null, result);
    });
};

MediaProperty.getMediaPropertyById = function(id, callback){
    redis.get(id + "_media_property", function(err, reply) {
        if(err) callback(err);

        callback(null, new MediaProperty(JSON.parse(reply)));
    });
};

module.exports = MediaProperty;