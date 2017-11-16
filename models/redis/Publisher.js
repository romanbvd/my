var redis = require('libs/redis');

function Publisher(data){
    this._data = (typeof data == 'object') ? data : {};
}

Publisher.getPublisherById = function(id, callback){
    redis.get(id + "_publisher", function(err, reply) {
        if(err) callback(err);

        callback(null, new Publisher(JSON.parse(reply)));
    });
};

module.exports = Publisher;