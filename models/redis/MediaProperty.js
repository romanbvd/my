var redis = require('libs/redis');

function MediaProperty(data){
    this._data = (typeof data == 'object') ? data : {};
}

MediaProperty.prototype.getName = function(){
    return this._data.name || '';
};

MediaProperty.getMediaPropertyById = function(id, callback){
    redis.get(id + "_media_property", function(err, reply) {
        if(err) callback(err);

        callback(null, new MediaProperty(JSON.parse(reply)));
    });
};

module.exports = MediaProperty;