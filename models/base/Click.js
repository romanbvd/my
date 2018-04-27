var mongoose = require('libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    country_short: String,
    city: String,
    ip: String,
    subscription_id: String,
    type: Number,
    click_id: String,
    campaign_id: String,
    publisher_id: String,
    first_click_time: Number,
    platform: String,
    device_type: String,
    user_agent: String,
    os_version: String,
    redirect_url: String,
    publisher_parameters: Array,
    click_rate: Number,
    revshare: Number,
    net: Number,
    publisher_net: Number,
    isp: String,
    idfa: String,
    gaid: String,
    lead_ip: String,

    timezone: String,
    resolution: String,
    language: String,

    advertiser_id: String,
    media_property_id: String,
    referrer: String,
    second_click_time: Number,
    is_smart: Boolean,
    redirect_type: String
});

module.exports = mongoose.model('Click', schema, 'clicks');