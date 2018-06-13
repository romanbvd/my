var redis = require('libs/redis');
var log = require('libs/log')(module);
var helper = require('libs/helper');

class MediaProperty {
    static get STATUS_PENDING(){return '0'};
    static get STATUS_REVIEWING(){return '1'};
    static get STATUS_APPROVED(){return '2'};
    static get STATUS_REJECTED(){return '3'};
    static get STATUS_REMOVED(){return '4'};

    static get REDIS_KEY(){return "_media_property";};

    constructor(data) {
        this._data = (typeof data == 'object') ? data : {};
    }

    getName(){
        return this._data.name || '';
    };

    getMediaPropertyId(){
        return this._data._id || '';
    };

    getStatus(){
        return this._data.status || '';
    };

    isIncent(){
        return this._data.is_incent;
    };

    markAsIncent(){
        this._data.is_incent = true;
    };

    save(callback){
        callback = callback || function(){};
        MediaProperty.REDIS.set(this.getMediaPropertyId() + MediaProperty.REDIS_KEY, JSON.stringify(this._data), callback);
    };

    isBlockedForAdvertiser(advertiserId, callback){
        var mpId = this.getMediaPropertyId();
        if(!helper.MongoDb.isValid(mpId)){
            log.error(helper.MongoDb.INVALID_OBJECT_ID + ' for "mediaPropertyId"');
        }

        if(!helper.MongoDb.isValid(advertiserId)){
            log.error(helper.MongoDb.INVALID_OBJECT_ID + ' for "advertiserId"');
        }

        MediaProperty.REDIS.get(this.getMediaPropertyId() + '_' + advertiserId + '_blocked_mp', function(err, reply) {
            if(err) callback(err);

            var result = (reply == null) ? false : true;
            callback(null, result);
        });
    };

    static getMediaPropertyById(id){
        return new Promise((resolve, reject) => {
            MediaProperty.REDIS.get(id + MediaProperty.REDIS_KEY, function (err, reply) {
                if (!reply || err) {
                    log.error('Media Property "' + id + '" not found in cache');
                    return reject(err);
                }

                resolve(new MediaProperty(JSON.parse(reply)));
            });
        })
    };
}

MediaProperty.REDIS = redis;

module.exports = MediaProperty;