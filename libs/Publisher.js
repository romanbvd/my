var amqp = require('amqplib/callback_api');

// if the connection is closed or fails to be established at all, we will reconnect
function Publisher(){

}

Publisher.amqpConn = null;
Publisher.pubChannel = null;
Publisher.offlinePubQueue = [];

Publisher.start = function(){
    amqp.connect("amqp://localhost?heartbeat=60", function(err, conn) {
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
        Publisher.amqpConn = conn;
        Publisher.startPublisher();
    });
}

Publisher.startPublisher = function() {
    Publisher.amqpConn.createConfirmChannel(function(err, ch) {
        if (Publisher.closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        Publisher.pubChannel = ch;
        while (true) {
            var m = Publisher.offlinePubQueue.shift();
            if (!m) break;
            Publisher.publish(m[0], m[1], m[2], function () {});
        }
    });
}

Publisher.closeOnErr = function(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    Publisher.amqpConn.close();
    return true;
}

Publisher.publish = function (exchange, routingKey, content, callback) {
    var exchange = '';
    var content = new Buffer(content);
    try {
        Publisher.pubChannel.assertQueue(routingKey, { durable: true }, function(){
            Publisher.pubChannel.publish(exchange, routingKey, content, { persistent: true },
                function(err, ok) {
                    if (err) {
                        console.error("[AMQP] publish", err);
                        Publisher.offlinePubQueue.push([exchange, routingKey, content]);
                        Publisher.pubChannel.connection.close();
                    }
                });

                callback();
        });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        Publisher.offlinePubQueue.push([exchange, routingKey, content]);
    }
};

Publisher.start();

module.exports = Publisher;