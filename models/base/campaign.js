var events = require('events');
var util = require('util');

function Db() {
    events.EventEmitter.call(this);
    this.ready = false;
    this.files = null;
    this.initialize();
}

util.inherits(Db, events.EventEmitter);

Db.prototype.initialize = function() {
    if (this.ready)
        return this.emit('ready');

    var self = this;
    require('fs').readdir('.', function(err, files) {
        if (err)
            return self.emit('error', err);

        self.files = files;
        self.ready = true;
        self.emit('ready');
    });
};

module.exports = new Db();

var res = {
    _id : ObjectId,
    external_system : String,
    adv_campaign_id : String,
    advertiser : String,
    title : String,
    app_description : String,
    import_data : String,
    end_date : Boolean,
    timezone : String,
    daily_cap : Int64,
    cap_limitation : Int64,
    traffic_sources_and_restrictions : Object,
    status : Int64,
    convertion_modes : String,
    attribution_window : String,
    cr_blocking_value : String,
    cr_low_limit : String,
    direct_campaign : Boolean,
    adv_campaign_api : String,
    payouts : Array,
    app_url : String,
    tracking_url_parameters : String,
    app_id : String,
    app_categories : Array,
    app_size : String,
    app_main_logo : String,
    app_images : [],
    playmarket_app_id : String,
    rating_android : String,
    kids_safe : String,
    kpi_interval : Int64,
    created_at : Int64,
    events_received : Boolean,
    updated_at : Int64,
    is_daily_capped : Boolean,
    title_sub_title : String,
    readable_id : Int64,
    creatives_id : String,
    sub_title : String,
    app_url_2 : String,
    itunes_app_id : String,
    tracking_url_ios : String,
    tracking_url_ipad : String,
    tracking_url_wp : String,
    app_developer : String,
    rating_ios : String,
    convertion_modes_details : String,
    start_date : Boolean,
    ignore_import : String,
    cr_blocking_value_low : String,
    cr_low_limit_low : String,
    targeting_tips : String,
    notes : Object,
    exclusive_publishers : Array,
    last_status_change : Int64,
    payable_event : Boolean
};