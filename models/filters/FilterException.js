var util = require('util');

function FilterException(code, message){
    this.message = message;
    this.code = code;
}

util.inherits(FilterException, Error);

module.exports = FilterException;