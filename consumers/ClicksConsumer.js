var inherits = require('util').inherits;
var BaseConsumer = require('libs/BaseConsumer');

function ClicksConsumer() {
    BaseConsumer.call();
}
inherits(ClicksConsumer, BaseConsumer);

ClicksConsumer.prototype.work = function(msg, cb){
    var click = msg.content.toString();
    console.log(JSON.parse(click));
 //   cb(true);
};

module.exports = ClicksConsumer;