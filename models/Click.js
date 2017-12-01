function Click(user_info, subscription){
    this._user_info = user_info;
    this._subscription = subscription;
}

Click.prototype.saveClick = function(){
    var clickInfo = this.getClickInfo();
    console.log(clickInfo);
};

Click.prototype.getClickInfo = function(){
    return {
        'country_short': '',// $this->user_info->country_short,
        'city': '',// $this->user_info->city,
        'ip': '',// $this->user_info->ip,
        'subscription_id': this._subscription.getSubscriptionId(),
        'type': '',// $this->type,
        'click_id': '',// $this->click_id,
        'campaign_id': this._subscription.getCampaignId(),
        'publisher_id': this._subscription.getPublisherId(),
        'first_click_time': '',// time(),
        'platform': '',// $this->user_info->getPlatform(),
        'device_type': '',// $this->user_info->getDeviceType(),
        'user_agent': '',// $this->user_info->get('User-Agent'),
        'os_version': '',// $this->user_info->getOsVersion(),
        'redirect_url': '',// $this->redirect(),
        'publisher_parameters': '',// $this->user_info->getSubIds(),
        'click_rate': '',// $this->getRate(),
        'revshare': '',// $this->getRevshare(),
        'net': '',// $this->getNetWithFactor(),
        'publisher_net': '',// $this->getRateWithPayoutFactor(),
        'isp': '',// $this->user_info->isp,
        'idfa': '',// $this->user_info->idfa,
        'gaid': '',// $this->user_info->gaid,
        'lead_ip': '',// $this->user_info->lead_ip,

        'timezone': '',// $this->user_info->getTimezone(),
        'resolution': '',// $this->user_info->getScreenResolution(),
        'language': '',// $this->user_info->getLanguage(),

        'advertiser_id': this._subscription.getCampaign().getAdvertiserId(),
        'media_property_id': this._subscription.getMediaPropertyId(),
        'referrer': '',// $this->user_info->getReferrer(),
        'second_click_time': '',// (int) 0,
        'is_smart': '',// $this->is_smart,
        'redirect_type': ''// $this->redirect_type
    };
};

module.exports = Click;