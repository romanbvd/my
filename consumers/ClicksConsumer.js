var inherits = require('util').inherits;
var async = require('async');

var log = require('libs/log')(module);

var BaseConsumer = require('libs/BaseConsumer');

var Click = require('models/Click');
var RedisCampaign = require('models/redis/Campaign');
var RedisMediaProperty = require('models/redis/MediaProperty');
var BaseMediaProperty = require('models/base/MediaProperty');

var BaseClick = require('models/base/Click');


function ClicksConsumer() {
    BaseConsumer.call();
}
inherits(ClicksConsumer, BaseConsumer);

ClicksConsumer.prototype.work = function(msg, cb){
    var message = msg.content.toString();
    var clickInfo = JSON.parse(message);

    if(clickInfo.type !== Click.TYPE_FIRST_CLICK){
        log.debug('Wrong message type. Removing...');
        cb(true);
        log.debug('Done');
        return;
    }

    async.waterfall([
        function(callback) {
            callback(null, clickInfo);
        },
        campaignIsIncent,
        mediaPropertyIsIncent,
        markMpAsIncent
    ], function(err, clickInfo){
        if(err && err !== true){
            log.error(err.message);
        }
    });

    var click = new BaseClick(clickInfo);
    click.save(function(err, user, affected){
        if(err) throw err;
        cb(true);
    });
};

function campaignIsIncent(clickInfo, callback){
    RedisCampaign.getCampaignById(clickInfo.campaign_id, function(err, campaign){
        if(err){
            return callback(err);
        }

        if(campaign.isIncent()){
            return callback(true, clickInfo);
        }else{
            return callback(null, clickInfo);
        }
    });
}

function mediaPropertyIsIncent(clickInfo, callback){
    RedisMediaProperty.getMediaPropertyById(clickInfo.media_property_id, function(err, mediaProperty){
        if(err){
            return callback(err);
        }

        if(mediaProperty.isIncent()){
            return callback(true, clickInfo);
        }else{
            return callback(null, clickInfo);
        }

    });
}

function markMpAsIncent(clickInfo, callback){
    BaseMediaProperty.markAsIncent(clickInfo.media_property_id, callback);
}

module.exports = ClicksConsumer;