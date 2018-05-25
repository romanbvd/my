var nconf = require('nconf');
var path = require('path');

var confFile = '';
switch(process.env.NODE_ENV) {
    case 'test':
        confFile = 'test_config.json';
        break;
    case 'development':
    default:
        confFile = 'config.json';
}

nconf.argv()
    .env()
    .file({file: path.join(__dirname, confFile)});

module.exports = nconf;