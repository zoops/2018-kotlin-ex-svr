var datas = require('../datas/datas')
var express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('invalid request uri');
});

router.get('/getRnDInfos', function(req, res, next) {
  res.send( { "result": true,
              "msgCode": "100",
              "message": "요청 작업 성공",
              "list" : datas } );
});

function isFiltered(it, kword){
  var res =  (it.title.toLowerCase().indexOf(kword) >= 0 || it.cat.toLowerCase().indexOf(kword) >= 0);
  if (res == false)
    res = it.asocicateWord.some(e => (e.toLowerCase().indexOf(kword) >= 0) );
  return res;
}

router.post('/getRnDInfos', function(req, res, next) {
  var filtered = datas;
  if (req.body.kword) 
    filtered = datas.filter( e => isFiltered(e, req.body.kword.toLowerCase()) );
  
  res.send( { "result": true,
              "msgCode": "100",
              "message": "요청 작업 성공",
              "list" : filtered } );
});

module.exports = router;
