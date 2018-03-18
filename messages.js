var express = require('express');
var router = express.Router();
var messages = require('../models/messages');


// /* GET users listing. */
router.get('/:user1_id/:user2_id',(req,res,next)=>{
    messages.getChatMessages((req.params.user1_id),(req.params.user2_id),(err,result)=>{
        if(err)  res.json(err);
        else res.json(result);
    })
   
});
router.post('/',(req,res,next)=>{
    messages.addMessage((req.body),(err,result)=>{
        if(err)  res.json(err);
        else res.json(result);
    })
});


module.exports = router;
