var amqp = require('amqplib/callback_api');

// if the connection is closed or fails to be established at all, we will reconnect
function Publisher(){
    this.amqpConn = null;
    this.pubChannel = null;
    this.offlinePubQueue = [];
}

Publisher.prototype.start = function(){
    var that = this;
    amqp.connect("amqp://localhost?heartbeat=60", function(err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(that.start, 1000);
        }
        conn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(that.start, 1000);
        });
        console.log("[AMQP] connected");
        that.amqpConn = conn;
        that.startPublisher();
    });
}

Publisher.prototype.startPublisher = function() {
    var that = this;
    this.amqpConn.createConfirmChannel(function(err, ch) {
        if (that.closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        that.pubChannel = ch;
        while (true) {
            var m = that.offlinePubQueue.shift();
            if (!m) break;
            that.publish(m[0], m[1], m[2], function () {});
        }
    });
}

Publisher.prototype.closeOnErr = function(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    this.amqpConn.close();
    return true;
};

Publisher.prototype.publish = function (routingKey, content, callback) {
    var that = this;
    var exchange = '';
    var content = new Buffer(content);
    try {
        this.pubChannel.assertQueue(routingKey, { durable: true }, function(){
            that.pubChannel.publish(exchange, routingKey, content, { persistent: true },
                function(err, ok) {
                    if (err) {
                        console.error("[AMQP] publish", err);
                        that.offlinePubQueue.push([exchange, routingKey, content]);
                        that.pubChannel.connection.close();
                    }
                });

                callback();
        });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        this.offlinePubQueue.push([exchange, routingKey, content]);
    }
};

var publisher = new Publisher();
publisher.start();


/*Publisher._instance = null;
Publisher.getInstance = function(){
    if(!this._instance){
        this._instance = new Publisher();
        this._instance.start();
    }

    return this._instance;
};*/

module.exports = publisher;