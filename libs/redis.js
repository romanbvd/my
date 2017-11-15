var config = require('config');
var redis = require('redis');
var client = redis.createClient();

client.auth(config.get('redis:password'));

module.exports = client;