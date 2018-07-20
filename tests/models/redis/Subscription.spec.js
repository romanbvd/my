// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

const redis = require('libs/redis');

const Subscription = require('models/redis/Subscription');
const campaignJson = require('./PublisherData');
const mediaPropertyJson = require('./MediaPropertyData');
const publisherJson = require('./PublisherData');

let subscriptionPromise = null;

//https://medium.com/caffeine-and-testing/async-testing-with-mocha-with-callbacks-and-promises-5d0002661b3f
describe('Test Subscription Redis module', function () {
    before(function () {
        /*let getStub = sinon.stub(redis, 'get');
        getStub.withArgs('test' + Campaign.REDIS_KEY).callsArgWith(1, null, JSON.stringify(campaignJson));
        Campaign.REDIS = redis;

        campaignPromise = Campaign.getCampaignById('test');*/
    });

    after(function () {
        // completely restore all fakes created through the sandbox
        //sinon.restore();
    });

    it('Test PublisherById()', function(){
       /* return campaignPromise.then(result => {
            assert.equal(result instanceof Campaign, true);
        });*/
    });
});