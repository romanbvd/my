// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

const redis = require('libs/redis');

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
        //console.log(callback(1, function(){console.log('s')})); // No return value, no exception
        //console.log(callback(42, function(){console.log('2')})); // Returns 1
    });

    it('Test getTitle()', function(){
        //console.log(callback(1, function(){console.log('s')})); // No return value, no exception
        //console.log(callback(42, function(){console.log('2')})); // Returns 1
    });

    it('Test getAdvertiserId()', function(){
        //console.log(callback(1, function(){console.log('s')})); // No return value, no exception
        //console.log(callback(42, function(){console.log('2')})); // Returns 1
    });

    it('Test getPayout()', function(){
        //console.log(callback(1, function(){console.log('s')})); // No return value, no exception
        //console.log(callback(42, function(){console.log('2')})); // Returns 1
    });

    it('Test isIncent()', function(){
        //console.log(callback(1, function(){console.log('s')})); // No return value, no exception
        //console.log(callback(42, function(){console.log('2')})); // Returns 1
    });
});