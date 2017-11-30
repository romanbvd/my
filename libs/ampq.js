//https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html
var amqp = require('amqplib/callback_api');
var config = require('config');
var log = require('libs/log')(module);


var amqpConn = null;
var pubChannel = null;
var offlinePubQueue = [];

/*
var connection = amqp.createConnection({
    host: config.get('rabbitmq:host'),
    port : config.get('rabbitmq:port'),
    login : config.get('rabbitmq:login'),
    password : config.get('rabbitmq:password'),
    vhost : config.get('rabbitmq:vhost')
});
*/
function start() {
    amqp.connect(process.env.CLOUDAMQP_URL + "?heartbeat=60", function(err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });
        console.log("[AMQP] connected");
        amqpConn = conn;
        whenConnected();
    });
}


function startPublisher() {
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

function publish(exchange, routingKey, content) {
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
}

function Ampq(){

}

Ampq.getInstance = function(callback) {
    amqp.connect('amqp://localhost', function (err, conn) {
        console.log(err);
        conn.createChannel(function (err, ch) {
            console.log(err);

            var ex = 'logs';
            var msg = process.argv.slice(2).join(' ') || 'Hello World!';

            ch.assertExchange(ex, 'fanout', {durable: false});
            ch.publish(ex, '', new Buffer(msg));
            console.log(" [x] Sent %s", msg);

            conn.close();

            callback();
        });
    });

}
module.exports = Ampq;
