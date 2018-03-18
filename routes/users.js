var express = require('express');
var router = express.Router();
var users = require('../models/users');
const bcrypt = require('bcrypt');

// /* GET users listing except current user. */
router.get('/:currentUserid',(req,res,next)=>{
    users.getAllusers((req.params.currentUserid),(err,result)=>{
        if(err)  res.json(err);
        else res.json(result);
    })
});
router.post('/',(req,res,next)=>{
    
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        users.adduser((req.body),(err,result)=>{
            if(err)  res.json(err);
            else res.json(result);
        })
    });
});
router.post('/login',(req,res,next)=>{
    
    users.login((req.body),(err,result)=>{
        if(err) 
        { res.json(err);}
        else {
            let sent=false;
            result.forEach(element => {
                bcrypt.compare(req.body.password, element.password, function(err, response) {
                    if(response) {
                        sent =true;
                        res.json(element);
                    } else {
                        
                     // Passwords don't match
                    } 
                  });
                
            });
            if(!sent){
             res.json("login failed");
            }
        }
    })
   
});



module.exports = router;
