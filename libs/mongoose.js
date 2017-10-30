var mongoose = require('mongoose');
var config = requre();

mongoose.connect(config.get('mongoose.uri'), config.get('mongoose.options'));

module.exports = mongoose;