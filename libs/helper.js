var objectId = require("mongodb").ObjectID;

var Helper = {};

Helper.MongoDb = {
    INVALID_OBJECT_ID: 'Invalid MongoId',
    isValid: objectId.isValid
}

module.exports = Helper;