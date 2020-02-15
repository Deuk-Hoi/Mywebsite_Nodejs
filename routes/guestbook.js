var express = require('express');
var db = require('../config/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('select * from guestbook', (error, fields) => {
    if(error)
    {
      throw error;
    }
    else{
      res.render('guestbook', { title: 'GuestBook', mydata: fields});
    }
  })
});

router.get('/guestbookwrite', (req, res, next)=>{
  res.render('write');
})
module.exports = router;
