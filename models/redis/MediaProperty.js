let redis = require('libs/redis');
let log = require('libs/log')(module);
let helper = require('libs/helper');
let util = require('util');

function MediaPropertyException(code, message){
    this.message = message;
    this.code = code;
}
util.inherits(MediaPropertyException, Error);

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
        let id = this._data._id || '';
        if(!helper.MongoDb.isValid(id)){
            return false;
        }

        return id;
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
        let mpId = this.getMediaPropertyId();

        if(!helper.MongoDb.isValid(advertiserId)){
            let msg = helper.MongoDb.INVALID_OBJECT_ID + ' for "advertiserId"';
            log.error(msg);
            return callback(msg);
        }

        MediaProperty.REDIS.get(this.getMediaPropertyId() + '_' + advertiserId + '_blocked_mp', function(err, reply) {
            if(err) callback(err);

            let result = (reply == null) ? false : true;
            callback(null, result);
        });
    };

    static getMediaPropertyById(id){
        return new Promise((resolve, reject) => {
            if (!id || !helper.MongoDb.isValid(id)) {
                let msg = 'MediaProperty ID not defined or wrong';
                log.error(msg);
                return reject(new MediaPropertyException(403, msg));
            }

            MediaProperty.REDIS.get(id + MediaProperty.REDIS_KEY, function (err, reply) {
                if (!reply || err) {
                    log.error('Media Property "' + id + '" not found in cache');
                    return reject(err);
                }

                resolve(new MediaProperty(JSON.parse(reply)));
            });
        });
    };
}

MediaProperty.REDIS = redis;

module.exports = MediaProperty;