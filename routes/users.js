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
    users.getUserByEmail((req.body),(err,check)=>{
        console.log(check.length);
        if(check.length > 0){
            //email already exist
            res.json("failed");
            return;
        }
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            req.body.password = hash;
            users.adduser((req.body),(err,result)=>{
                if(err)  res.json(err);
                else res.json(result);
            })
        });
    });
});
router.post('/login',(req,res,next)=>{
    
    users.login((req.body),(err,result)=>{
        if(err) 
        {
             res.json(err);
        }
        else 
        {
            bcrypt.compare(req.body.password, result[0].password, function(err, response) {
                if(response) {
                    res.json(result[0]);
                    } else{
                        res.json("login failed");
                    }  
              });
        }
    })
   
});



module.exports = router;
