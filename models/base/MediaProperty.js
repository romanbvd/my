var mongoose = require('libs/mongoose');
var RedisMediaProperty = require('models/redis/MediaProperty');

var Schema = mongoose.Schema;

var schema = new Schema({
    readable_id: Number,
    user_id : String,
    type : String,
    affiliate : Object,
    name : String,
    promotionMethods : Array,
    adUnits : Array,
    country : Array,
    trafficIncentivized : String,
    publisher_name : String,
    publisher_id : String,
    account_manager_name : String,
    account_manager_id : String,
    created_at : Number,
    status : String,
    global_callback_url : String,
    global_callback_method : String,
    api_access : Number,
    notes : String,
    server_side_redirect : Number,
    is_incent: Boolean
});

schema.statics.markAsIncent = function(mp_id, callback){
    this.update({_id:mongoose.Types.ObjectId(mp_id)}, { is_incent: true}, {}, function(err, doc){
        if(err) {
            return callback(err);
        }

        RedisMediaProperty.getMediaPropertyById(mp_id, function(err, mediaProperty){
            mediaPropertymarkAsIncent();
            mediaProperty.save(callback);
        });
    })
};

module.exports = mongoose.model('MediaProperty', schema, 'media_properties');