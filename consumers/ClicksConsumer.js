var inherits = require('util').inherits;
var BaseConsumer = require('libs/BaseConsumer');

var Click = require('models/Click');
var Campaign = require('models/redis/Campaign');

function ClicksConsumer() {
    BaseConsumer.call();
}
inherits(ClicksConsumer, BaseConsumer);

ClicksConsumer.prototype.work = function(msg, cb){
    var message = msg.content.toString();
    click = JSON.parse(message);

    if(click.type != Click.TYPE_FIRST_CLICK){
        console.log('Wrong message type. Removing...');
        cb(true);
        console.log('Done');
        return;
    }

    Campaign.getCampaignById(click.campaign_id, function(err, campaign){
        if(err){
            console.log(err);
            return;
        }

        if(campaign.isIncent()){

        }


    });

    click.saveToDb();
    cb(true);
};


module.exports = ClicksConsumer;