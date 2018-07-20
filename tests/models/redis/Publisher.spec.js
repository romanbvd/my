// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

const redis = require('libs/redis');

const Publisher = require('models/redis/Publisher');
const publisherJson = require('./PublisherData');
let mpPromise = null;

//https://medium.com/caffeine-and-testing/async-testing-with-mocha-with-callbacks-and-promises-5d0002661b3f

const publisherId = '5756cb35dd1213b40e8b457b';
describe('Test Publisher Redis module', function () {
    before(function () {
        let getStub = sinon.stub(redis, 'get');
        getStub.withArgs(publisherId + Publisher.REDIS_KEY).callsArgWith(1, null, JSON.stringify(publisherJson));

        Publisher.REDIS = redis;

        publisherPromise = Publisher.getPublisherById(publisherId);
    });

    after(function () {
        // completely restore all fakes created through the sandbox
        sinon.restore();
    });

    it('Test PublisherById()', function(){
        return publisherPromise.then(result => {
            assert.equal(result instanceof Publisher, true);
        });
    });
});