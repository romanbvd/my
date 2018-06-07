var redis = require('libs/redis');
var log = require('libs/log')(module);

class Publisher{
    constructor(data){
        this._data = (typeof data == 'object') ? data : {};
    }

    static getPublisherById(id, callback){
        Publisher.REDIS.get(id + "_publisher", function(err, reply) {
            if(!reply || err) {
                log.error('Publisher "' + id + '" not found in cache');
                return callback(err);
            }

            callback(null, new Publisher(JSON.parse(reply)));
        });
    }
}

Publisher.REDIS = redis;

module.exports = Publisher;