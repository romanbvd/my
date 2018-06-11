var redis = require('libs/redis');
var log = require('libs/log')(module);

class Publisher{
    constructor(data){
        this._data = (typeof data == 'object') ? data : {};
    }

    static getPublisherById(id, callback){
        return new Promise((resolve, reject) => {
            Publisher.REDIS.get(id + "_publisher", function (err, reply) {
                if (!reply || err) {
                    log.error('Publisher "' + id + '" not found in cache');

                    return reject(err);
                }

                resolve(new Publisher(JSON.parse(reply)));
            });
        });
    }
}

Publisher.REDIS = redis;

module.exports = Publisher;