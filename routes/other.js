var express = require('express');
var router = express.Router();

var request = require('request');
var servicekey = "4bppUTzZtqi1tLwhMbLNz36lDIGL%2FETSLGd1dwvigsRy3WZk4ALOuGJZqcyH7ERTJnouGKHO1R8jMpTTQ1VwVA%3D%3D";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('other', { title: 'Other' });
});

router.get('/line', function(req, res, next){
  var citycode = req.query.citycode;
  var linenum = req.query.linenum;

  var url = "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey="+servicekey+"&cityCode="+citycode+"&routeNo="+linenum+"&_type=json";
  request({url: url,  method: 'GET'}, function(error, response, body){
    console.log(body);
    res.json(body);
  })
})

router.get('/routeid', function(req, res, next){
  var citycode = req.query.citycode;
  var routeid = req.query.routeid;

  var url = "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteAcctoThrghSttnList?serviceKey="+servicekey+"&numOfRows=100&pageNo=1&cityCode="+citycode+"&routeId="+routeid+"&_type=json";
  request({url: url,  method: 'GET'}, function(error, response, body){
    console.log(body);
    res.json(body);
  })
})

module.exports = router;
