var express = require('express');
var router = express.Router();

var request = require('request');
const convert = require('xml-js')

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

router.get('/address', function(req, res, next){
  var country = req.query.country;
  var building = req.query.building;
  console.log(country+" "+building);
  var url = "http://openapi.epost.go.kr/postal/retrieveLotNumberAdressAreaCdService/retrieveLotNumberAdressAreaCdService/getComplexListAreaCd?ServiceKey=4bppUTzZtqi1tLwhMbLNz36lDIGL%2FETSLGd1dwvigsRy3WZk4ALOuGJZqcyH7ERTJnouGKHO1R8jMpTTQ1VwVA%3D%3D&areaNm="+encodeURI(country)+"&searchSe=and&srchwrd="+encodeURI(building);
  var xmlToJson;
  request({url: url,  method: 'GET'}, function(error, response, body){
    if(error)
    {
      console.log(`error => ${error}`);
    }
    else{
      if(res.statusCode == 200)
      {
        var result = body;
        //console.log(`body data => ${result}`);
        xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
        //console.log(`xml to json => ${xmlToJson}`); 
        res.json(xmlToJson);
      }
    }
  })
  /*request.get(url, (err, res, body) => {
    
    if(err)
    {
      console.log(`err => ${err}`);
    }
    else{
      if(res.statusCode == 200)
      {
        var result = body;
        //console.log(`body data => ${result}`);
        xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
        //console.log(`xml to json => ${xmlToJson}`); 
        
      }
    }
    res.send(xmlToJson);
  })*/
  

})

module.exports = router;
