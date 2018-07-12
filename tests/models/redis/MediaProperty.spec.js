// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

const redis = require('libs/redis');
const MediaProperty = require('models/redis/MediaProperty');
const mediaPropertyJson = require('./MediaPropertyData');
let mpPromise = null;

//https://medium.com/caffeine-and-testing/async-testing-with-mocha-with-callbacks-and-promises-5d0002661b3f
describe('Test Media Propert Redis module', function () {
    before(function () {
        let getStub = sinon.stub(redis, 'get');
        let setStub = sinon.stub(redis, 'set');

        getStub.withArgs('test' + MediaProperty.REDIS_KEY).callsArgWith(1, null, JSON.stringify(mediaPropertyJson));
        setStub.withArgs('5756cb35dd1213b40e8b457b' + MediaProperty.REDIS_KEY).callsArgWith(2, 'some_data');

        MediaProperty.REDIS = redis;
        mpPromise = MediaProperty.getMediaPropertyById('test');
    });

    after(function () {
        // completely restore all fakes created through the sandbox
        sinon.restore();
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

            result._data._id = '122';
            assert.equal(result.getMediaPropertyId(), false);
            result._data._id = '5756cb35dd1213b40e8b457b';
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

    it('Test save() function, "set" of redis calls', function () {
        return mpPromise.then(result => {
            result.markAsIncent();
            result.save(function(data){
                assert.equal(data, 'some_data');
            });
        });
    });

    it('Test isBlockedForAdvertiser()', function () {
        //sandbox.stub(c);
        //sandbox.restore();
        return mpPromise.then(result => {
            result.isBlockedForAdvertiser('sas', function(data){
              //  console.log(data);
              //  assert.equal(data, 'some_data');
            });
        });
    });
});