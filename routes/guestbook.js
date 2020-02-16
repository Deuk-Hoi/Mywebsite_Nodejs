var express = require('express');
var db = require('../config/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.redirect('/guestbook/page/1');
    
});

router.get('/page/:num', function(req, res, next){
  db.query('select * from guestbook', (error, fields) => {
    if(error)
    {
      throw error;
    }
    else{
      res.render('guestbook', {title: 'GuestBook', mydata: fields, page_num : req.params.num, max_value : 5});
    }
  });
});

router.get('/guestbookwrite', (req, res, next)=>{
  res.render('guestbookwrite', { title: 'GuestBook Write'});
});

router.post('/guestbookwrite', (req, res, next)=>{
  var today = new Date();
  var data = {
    name : req.body.name,
    contents : req.body.contents,
    date : today
  };

  db.query(`insert into guestbook set ?`,data, function(error, fields){
    if(error)
    {
      throw error;
    }
    else{
      res.redirect('/guestbook');
    }
  })
});
module.exports = router;
