var express = require('express');
var router = express.Router();
var users = require('../models/users');


// /* GET users listing except current user. */
router.get('/:currentUserid',(req,res,next)=>{
    users.getAllusers((req.params.currentUserid),(err,result)=>{
        if(err)  res.json(err);
        else res.json(result);
    })
});
router.post('/',(req,res,next)=>{
  users.adduser((req.body),(err,result)=>{
      if(err)  res.json(err);
      else res.json(result);
  })
});


module.exports = router;