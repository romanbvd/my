let redis = require('libs/redis');
let log = require('libs/log')(module);
let util = require('util');
let helper = require('libs/helper');

function PublisherException(code, message){
    this.message = message;
    this.code = code;
}
util.inherits(PublisherException, Error);

class Publisher{
    static get REDIS_KEY(){return "_publisher";};

    constructor(data){
        this._data = (typeof data == 'object') ? data : {};
    }

    static getPublisherById(id){
        return new Promise((resolve, reject) => {
            if (!id || !helper.MongoDb.isValid(id)) {
                let msg = 'Publisher ID not defined or wrong';
                log.error(msg);
                return reject(new PublisherException(403, msg));
            }

            Publisher.REDIS.get(id + Publisher.REDIS_KEY, function (err, reply) {
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