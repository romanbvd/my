var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/user', function(req, res, next) {
    console.log(req.params.id);
    res.send('respond with a resource');
});

module.exports = router;
