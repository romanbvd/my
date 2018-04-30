var winston = require('winston');
var ENV = process.env.NODE_ENV;

function getLogger(module){
    var path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports : [
            new winston.transports.Console({
                colorized : true,
                level: ENV == 'development' ? 'debug' : 'error',
                label: path
            }),
            new winston.transports.File({filename:'debug.log', label: path, level:'error'})
        ]
    });
}

module.exports = getLogger;