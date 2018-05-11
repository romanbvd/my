// test-setup.spec.js
const sinon = require('sinon');
var myAPI = { hello: function () {console.log('s');} };

describe('myAPI.hello method', function () {

    beforeEach(function () {
        // stub out the `hello` method
        sinon.stub(myAPI, 'hello');
    });

    afterEach(function () {
        // completely restore all fakes created through the sandbox
        sinon.restore();
    });

    it('should be called once', function () {
        myAPI.hello();
        sinon.assert.calledOnce(myAPI.hello);
        assert.equals(stub(), 42);
        //sinon.assert.calledTwice(myAPI.hello);
    });

    it('should be called twice', function () {
       // myAPI.hello();
       // myAPI.hello();
       // sandbox.assert.calledTwice(myAPI.hello);
    });
});