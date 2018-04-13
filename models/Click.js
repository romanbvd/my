var Publisher = require('libs/Publisher');
var GuidGenerator = require('libs/helpers/GuidGenerator');

function Click(user_info, subscription){
    this._user_info = user_info;
    this._subscription = subscription;

    this._cache_payout = null;

    this._is_smart = false;
}

Click.TYPE_FIRST_CLICK = 1;

Click.prototype.saveClick = function(callback, smart){
    this._is_smart = smart || false;
    var clickInfo = this.getClickInfo();
    console.log(clickInfo);
    return callback();
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
        'device_type': this._user_info.getDeviceType(),
        'user_agent': this._user_info.getUserAgent(),
        'os_version': this._user_info.getOsVersion(),
        'redirect_url': '',// $this->redirect(),
        'publisher_parameters': this._user_info.getPublisherParams(),
        'click_rate': this.getRate(),
        'revshare': this.getRevshare(),
        'net': this.getNetWithFactor(),
        'publisher_net': this.getRateWithPayoutFactor(),
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
        'is_smart': this._is_smart,
        'redirect_type': this._user_info.getQueryParam('redirect_type', 'backend')
    };
};

Click.prototype.getStopClickInfo = function(){
    return {
        'click_id': '',// $this->click_id,
        'subscription_id': '',// $this->subscription_info->id,
        'type': '',// self::STOP_CLICK,
        'media_property_id': '',// $this->subscription_info->getMediaPropertyId(),
        'media_property_name': '',// $this->subscription_info->getMediaPropertyName(),
        'publisher_name': '',// $this->subscription_info->publisher->name,
        'ip': '',// $this->user_info->ip,
        'country': '',// $this->user_info->country_short,
        'city': '',// $this->user_info->city,
        'campaign_id': '',// $this->subscription_info->campaign->id,
        'campaign_name': '',// $this->subscription_info->campaign->title,
        'reason': '',// $reason,
        'reason_code': '',// $reason_code,
        'redirect_url': '',// '',
        'user_agent': '',// $_SERVER['HTTP_USER_AGENT'],
        'created_at': '',// time(),
        'query_params': '',// $_SERVER["QUERY_STRING"],
        'subid1': '',// $request->params('subid1', ''),
        'subid2': '',// $request->params('subid2', ''),
        'publisher_parameters': '',// $this->user_info->getSubIds(),
        'referrer': '',// $this->user_info->getReferrer(),
        'redirected_to_smartlink': ''// $redirected_to_smartlink
    };
};

Click.prototype.getRate = function(){
    var payout = this.getPayoutByLocation();
    return parseFloat(payout.usd_payout) || 0;
};

Click.prototype.getRevshare = function(){
    var payout = this.getPayoutByLocation();
    return parseFloat(payout.revshare) || 0;
};

Click.prototype.getNet = function(){
    var subscription_id = this._subscription.getSubscriptionId();
    var payout = this.getPayoutByLocation();

    var payout = this.getRate();
    var revshare = this.getRevshare();

    if(payout.alt_payout && payout.alt_payout[subscription_id]){
        revshare = payout.alt_payout[subscription_id];
    }

    return parseFloat((payout * (100 - revshare) / 100).toFixed(2));
};

Click.prototype.getRateWithPayoutFactor = function(){
    var pub_net = this.getRate() - this.getNet();
    var payment_factor = 0; // payment factor is 0 all the time. unused feature...

    var result = ((payment_factor / 100) * pub_net) + pub_net;

    return parseFloat(result.toFixed(2));
};

Click.prototype.getNetWithFactor = function(){
    var publisher_net_with_factor = this.getRateWithPayoutFactor();

    var net_with_factor = this.getRate() - publisher_net_with_factor;

    return parseFloat(net_with_factor.toFixed(2));
};

Click.prototype.getPayoutByLocation = function(){
    if(this._cache_payout != null){
        return this._cache_payout;
    }

    this._cache_payout = this._subscription.getPayoutInformation(this._user_info.getPlatform(), this._user_info.getCountry(), this._user_info.getCity());
    return this._cache_payout;
};

Click.prototype.getRedirect = function(){

};

module.exports = Click;