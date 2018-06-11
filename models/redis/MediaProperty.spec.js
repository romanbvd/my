// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

const redis = require('libs/redis');
const MediaProperty = require('./MediaProperty');
const mediaPropertyJson = require('./MediaPropertyData');
let mediaProperty = null;

describe('Test Media Propert Redis module', function () {

    before(function () {
        sinon.stub(redis, 'get').withArgs('test' + MediaProperty.REDIS_KEY).callsArgWith(1, null, JSON.stringify(mediaPropertyJson));

        MediaProperty.REDIS = redis;

        let mp = MediaProperty.getMediaPropertyById('test');
        mp.then(result => {
            console.log('sss');
        }, error => {console.log(error)});
        /*redis.get('test_' + MediaProperty.REDIS_KEY, function(a, b){
            console.log(a);console.log(b);
        });*/
    });

    after(function () {
        // completely restore all fakes created through the sandbox
       // sinon.restore();
    });

    it('Test getName() function', function () {

        //assert.equal(mediaProperty.getName(), 'Property134');
      //  assert.notEqual(mediaProperty.getName(), '');
    });

    it('Test getMediaPropertyId() function', function () {
       // assert.equal(mediaProperty.getMediaPropertyId(), '5756cb35dd1213b40e8b457b');
    });

    it('Test markAsIncent() function', function () {
      //  assert.equal(mediaProperty.getMediaPropertyId(), '5756cb35dd1213b40e8b457b');
        //isIncent(){}
    });
});