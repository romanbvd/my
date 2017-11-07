var async = require('async');

var IspFilter = require('IspFilter');

async.waterfall([
    IspFilter,
    function(arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'
});