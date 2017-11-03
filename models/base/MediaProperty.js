var mongoose = require('libs/mongoose');
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
    server_side_redirect : Number
});

module.exports = mongoose.model('MediaProperty', schema, 'media_properties');