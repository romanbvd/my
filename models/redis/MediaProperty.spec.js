// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

var MediaProperty = require('./MediaProperty');
var mediaPropertyJson = require('./MediaPropertyData');
var mediaProperty = null;

describe('Test Media Propert Redis module', function () {

    before(function () {
        mediaProperty = new MediaProperty(mediaPropertyJson);
    });

    after(function () {
        // completely restore all fakes created through the sandbox
       // sinon.restore();
    });

    it('Test getName() function', function () {
        assert.equal(mediaProperty.getName(), 'Property134');
        assert.notEqual(mediaProperty.getName(), '');
    });

    it('Test getMediaPropertyId() function', function () {
        assert.equal(mediaProperty.getMediaPropertyId(), '5756cb35dd1213b40e8b457b');
    });

    it('Test markAsIncent() function', function () {
        assert.equal(mediaProperty.getMediaPropertyId(), '5756cb35dd1213b40e8b457b');
        //isIncent(){}
    });
});