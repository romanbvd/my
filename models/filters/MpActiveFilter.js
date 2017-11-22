var ERR_MESSAGE = 'MP is blocked for advertiser';
var ERR_CODE = 115;

function MpActiveFilter(subscription, callback){
    console.dir(subscription.getCampaign().getAdvertiserId());
    console.log(subscription.getMediaProperty());
    callback(null, subscription);
};

module.exports = MpActiveFilter;

/*

$allowed = $this->db->isMpAllowed($this->subscription_info->media_property->_id, $this->subscription_info->campaign->advertiser);
        if(!$allowed){
            $this->reason = self::REASON_MEDIA_PROPERTY_BLOCKED;
            $this->reason_code = self::ERR_CODE_MEDIA_PROPERTY_BLOCKED;
            return false;
        }

        return true;
 */