// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

const redis = require('libs/redis');

const Campaign = require('models/redis/Campaign');
const campaignJson = require('./CampaignData');
let mpPromise = null;

//https://medium.com/caffeine-and-testing/async-testing-with-mocha-with-callbacks-and-promises-5d0002661b3f
describe('Test Campaign Redis module', function () {
    before(function () {
        let getStub = sinon.stub(redis, 'get');
        getStub.withArgs('test' + Campaign.REDIS_KEY).callsArgWith(1, null, JSON.stringify(campaignJson));

        Campaign.REDIS = redis;

        campaignPromise = Campaign.getCampaignById('test');
    });

    after(function () {
        // completely restore all fakes created through the sandbox
        sinon.restore();
    });

    it('Test getCampaignById()', function(){
        return campaignPromise.then(result => {
            assert.equal(result instanceof Campaign, true);
        });
    });

    it('Test getTitle()', function(){
        return campaignPromise.then(result => {
            assert.equal(typeof result.getTitle, 'function');
            assert.equal(result.getTitle(), 'campaign for changes 72');
        });
    });

    it('Test getAdvertiserId()', function(){
        return campaignPromise.then(result => {
            assert.equal(typeof result.getAdvertiserId, 'function');
            assert.equal(result.getAdvertiserId(), '561522b19879cad9410041a7');
        });
    });

    it('Test getPayout()', function(){
        return campaignPromise.then(result => {
            assert.equal(typeof result.getPayout, 'function');
            assert.equal(typeof result.getPayout(), 'object');

            let payouts = result.getPayout();
            assert.equal(payouts[0].payout, '7')
            assert.equal(payouts[1].payout, '13')
        });
    });

    it('Test isIncent()', function(){
        return campaignPromise.then(result => {
            assert.equal(typeof result.isIncent, 'function');
            assert.equal(result.isIncent(), false);
        });
    });
});