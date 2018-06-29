// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

const redis = require('libs/redis');
const MediaProperty = require('./MediaProperty');
const mediaPropertyJson = require('./MediaPropertyData');
let mpPromise = null;

//https://medium.com/caffeine-and-testing/async-testing-with-mocha-with-callbacks-and-promises-5d0002661b3f
describe('Test Media Propert Redis module', function () {

    before(function () {
        sinon.stub(redis, 'get').withArgs('test' + MediaProperty.REDIS_KEY).callsArgWith(1, null, JSON.stringify(mediaPropertyJson));

        MediaProperty.REDIS = redis;
        mpPromise = MediaProperty.getMediaPropertyById('test');
    });

    after(function () {
        // completely restore all fakes created through the sandbox
       // sinon.restore();
    });

    it('Test getMediaPropertyById', function(){
        return mpPromise.then(result => {
            assert.equal(result instanceof MediaProperty, true);
        });
    });

    it('Test getName() function', function () {
        return mpPromise.then(result => {
            assert.equal(typeof result.getName, 'function');
            assert.equal(result.getName(), 'Property134');
        });
    });

    it('Test getMediaPropertyId() function', function () {
        return mpPromise.then(result => {
            assert.equal(typeof result.getMediaPropertyId, 'function');
            assert.equal(result.getMediaPropertyId(), '5756cb35dd1213b40e8b457b');
        });
    });

    it('Test isIncent() function', function () {
        return mpPromise.then(result => {
            assert.equal(typeof result.isIncent, 'function');
            assert.isBoolean(result.isIncent());
            assert.equal(result.isIncent(), false);
        });
    });

    it('Test markAsIncent() function', function () {
        return mpPromise.then(result => {
            assert.equal(result.isIncent(), false);

            result.markAsIncent();
            
            assert.equal(result.isIncent(), true);
        });
    });
});