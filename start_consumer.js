//NODE_PATH=. nodejs start_consumer.js
var Consumer = require('consumers/ClicksConsumer');

var consumer = new Consumer();
consumer.start('clicks');