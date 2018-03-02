var redis = require('libs/redis');
var log = require('libs/log')(module);
var helper = require('libs/helper');

function MediaProperty(data){
    this._data = (typeof data == 'object') ? data : {};
}

MediaProperty.STATUS_PENDING = '0';
MediaProperty.STATUS_REVIEWING = '1';
MediaProperty.STATUS_APPROVED = '2';
MediaProperty.STATUS_REJECTED = '3';
MediaProperty.STATUS_REMOVED = '4';

MediaProperty.prototype.getName = function(){
    return this._data.name || '';
};

MediaProperty.prototype.getMediaPropertyId = function(){
    return this._data._id || '';
};

MediaProperty.prototype.isBlockedForAdvertiser = function(advertiserId, callback){
    var mpId = this.getMediaPropertyId();
    if(!helper.MongoDb.isValid(mpId)){
        log.error(helper.MongoDb.INVALID_OBJECT_ID + ' for "mediaPropertyId"');
    }

    if(!helper.MongoDb.isValid(advertiserId)){
        log.error(helper.MongoDb.INVALID_OBJECT_ID + ' for "advertiserId"');
    }

    redis.get(this.getMediaPropertyId() + '_' + advertiserId + '_blocked_mp', function(err, reply) {
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