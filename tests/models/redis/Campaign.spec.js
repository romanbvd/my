// test-setup.spec.js
const sinon = require('sinon');
const assert = require('chai').assert;

const redis = require('libs/redis');

let callback = null;

//https://medium.com/caffeine-and-testing/async-testing-with-mocha-with-callbacks-and-promises-5d0002661b3f
describe('Test Campaign Redis module', function () {
    before(function () {
        callback = sinon.stub(redis, 'get');
        callback.withArgs(42).callsArg(1);
        callback.withArgs(1).callsArg(1);


        //callback(1);
    });

    after(function () {
        // completely restore all fakes created through the sandbox
        sinon.restore();
    });

    it('Test callback', function(){
        //console.log(callback(1, function(){console.log('s')})); // No return value, no exception
        //console.log(callback(42, function(){console.log('2')})); // Returns 1
    });


});