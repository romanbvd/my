const sinon = require('sinon');
const chai = require('chai');

const MediaProperty = require('models/redis/MediaProperty');

describe('Test Redis Media Property', function () {

    beforeEach(function () {
        this.sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        this.sandbox.restore()
    });

    it('saves the content', function() {
        let stub = this.sandbox.stub(MediaProperty, 'getMediaPropertyById');
        stub.withArgs(1).returns(222);



        console.log(MediaProperty.getMediaPropertyById(1));
        //this.sandbox.assert
    })
});