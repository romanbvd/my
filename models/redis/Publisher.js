var redis = require('libs/redis');
var log = require('libs/log')(module);

function Publisher(data){
    this._data = (typeof data == 'object') ? data : {};
}

Publisher.getPublisherById = function(id, callback){
    redis.get(id + "_publisher", function(err, reply) {
        if(!reply || err) {
            log.error('Publisher "' + id + '" not found in cache');
            return callback(err);
        }

        callback(null, new Publisher(JSON.parse(reply)));
    });
};

module.exports = Publisher;