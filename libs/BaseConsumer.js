var amqp = require('amqplib/callback_api');

function Consumer(){
    this.queue_name = '';
    this.amqpConn = null;
}

Consumer.prototype.start = function(queue_name){
    this.queue_name = queue_name;
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
        if (that.closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });

        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        ch.prefetch(10);
        ch.assertQueue(that.queue_name, { durable: true }, function(err, _ok) {
            if (that.closeOnErr(err)) return;
            ch.consume(that.queue_name, processMsg, { noAck: false });
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
                    that.closeOnErr(e);
                }
            });
        }
    });
};

Consumer.prototype.closeOnErr = function(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    this.amqpConn.close();
    return true;
};

Consumer.prototype.work = function(msg, cb) {
    console.log("Got msg ", msg.content.toString());
    cb(true);
};

module.exports = Consumer;