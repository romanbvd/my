//https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html
//https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
//https://gist.github.com/carlhoerberg/006b01ac17a0a94859ba
var amqp = require('amqplib/callback_api');
var config = require('config');
var log = require('libs/log')(module);

var amqpConn = null;
var pubChannel = null;
var offlinePubQueue = [];

function start(){
    openConnection();
}

function openConnection() {

    amqp.connect(config.get('rabbitmq'), function(err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(openConnection, 1000);
        }
        conn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(openConnection, 1000);
        });
        console.log("[AMQP] connected");
        amqpConn = conn;
        console.log('here');
        openChannel();
    });
}


function openChannel() {
    amqpConn.createConfirmChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        pubChannel = ch;
        while (true) {
            var m = offlinePubQueue.shift();
            if (!m) break;
            publish(m[0], m[1], m[2]);
        }
    });
}


function ampqModel(){

}

ampqModel.publish = function(exchange, routingKey, content) {
    start();
    console.log(pubChannel);
    return;
    try {
        pubChannel.publish(exchange, routingKey, content, { persistent: true },
            function(err, ok) {
                if (err) {
                    console.error("[AMQP] publish", err);
                    offlinePubQueue.push([exchange, routingKey, content]);
                    pubChannel.connection.close();
                }
            });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        offlinePubQueue.push([exchange, routingKey, content]);
    }
};

module.exports = ampqModel;
