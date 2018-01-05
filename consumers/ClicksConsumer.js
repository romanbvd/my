var inherits = require('util').inherits;
var Consumer = require('libs/BaseConsumer');

function ClicksConsumer() {
    Consumer.call();
}
inherits(Channel, BaseChannel);

ClicksConsumer.prototype.work = function(msg, cb){
    console.log("Clicks Consumer Got msg ", msg.content.toString());
    cb(true);
}