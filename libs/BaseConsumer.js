var amqp = require('amqplib/callback_api');

function Consumer(){
    this.amqpConn = null;
}

Consumer.prototype.start = function(){
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
        that.startWorker();
    });
};

Consumer.prototype.startWorker = function() {
    var that = this;
    this.amqpConn.createChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });

        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        ch.prefetch(10);
        ch.assertQueue("jobs", { durable: true }, function(err, _ok) {
            if (closeOnErr(err)) return;
            ch.consume("jobs", processMsg, { noAck: false });
            console.log("Worker is started");
        });

        function processMsg(msg) {
            that.work(msg, function(ok) {
                try {
                    if (ok)
                        ch.ack(msg);
                    else
                        ch.reject(msg, true);
                } catch (e) {
                    closeOnErr(e);
                }
            });
        }
    });
};

Consumer.prototype.work = function(msg, cb) {
    console.log("Got msg ", msg.content.toString());
    cb(true);
};

module.exports = Consumer;