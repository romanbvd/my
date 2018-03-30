var Publisher = require('libs/Publisher');
var GuidGenerator = require('libs/helpers/GuidGenerator');

function Click(user_info, subscription){
    this._user_info = user_info;
    this._subscription = subscription;
}

Click.TYPE_FIRST_CLICK = 1;

Click.prototype.saveClick = function(callback){
    var clickInfo = this.getClickInfo();
//console.log(clickInfo);return callback();
    Publisher.publish('clicks', clickInfo, callback);
};

Click.prototype.saveStopClick = function(callback){
    var clickInfo = this.getStopClickInfo();
    Publisher.publish('stop_clicks', clickInfo, callback);
};

Click.prototype.getClickInfo = function(){
    return {
        'country_short': this._user_info.getCountry(),
        'city': this._user_info.getCity(),
        'ip': this._user_info.getIp(),
        'subscription_id': this._subscription.getSubscriptionId(),
        'type': Click.TYPE_FIRST_CLICK,
        'click_id': GuidGenerator.guid().toUpperCase(),
        'campaign_id': this._subscription.getCampaignId(),
        'publisher_id': this._subscription.getPublisherId(),
        'first_click_time': Number.parseInt((new Date()).getTime() / 1000),
        'platform': this._user_info.getPlatform(),
        'device_type': '',// $this->user_info->getDeviceType(),
        'user_agent': this._user_info.getUserAgent(),
        'os_version': this._user_info.getOsVersion(),
        'redirect_url': '',// $this->redirect(),
        'publisher_parameters': '',// $this->user_info->getSubIds(),
        'click_rate': '',// $this->getRate(),
        'revshare': '',// $this->getRevshare(),
        'net': '',// $this->getNetWithFactor(),
        'publisher_net': '',// $this->getRateWithPayoutFactor(),
        'isp': this._user_info.getIsp(),
        'idfa': this._user_info.getQueryParam('idfa'),
        'gaid': this._user_info.getQueryParam('gaid'),
        'lead_ip': this._user_info.getQueryParam('lead_ip'),

        'timezone': '',// $this->user_info->getTimezone(),
        'resolution': '',// $this->user_info->getScreenResolution(),
        'language': '',// $this->user_info->getLanguage(),

        'advertiser_id': this._subscription.getCampaign().getAdvertiserId(),
        'media_property_id': this._subscription.getMediaPropertyId(),
        'referrer': '',// $this->user_info->getReferrer(),
        'second_click_time': 0,
        'is_smart': '',// $this->is_smart,
        'redirect_type': ''// $this->redirect_type
    };
};

module.exports = Click;