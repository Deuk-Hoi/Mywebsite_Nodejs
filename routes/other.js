var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('other', { title: 'Other' });
});

router.get('/a', function(req, res, next){
  var citycode = req.query.citycode;
  var linenum = req.query.linenum;
  console.log(linenum);
  var servicekey = "4bppUTzZtqi1tLwhMbLNz36lDIGL%2FETSLGd1dwvigsRy3WZk4ALOuGJZqcyH7ERTJnouGKHO1R8jMpTTQ1VwVA%3D%3D";
  var url = "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey="+servicekey+"&cityCode="+citycode+"&routeNo="+linenum+"&_type=json";
  request({url: url,  method: 'GET'}, function(error, response, body){
    console.log(body);
    res.json(body);
  })
})

module.exports = router;
