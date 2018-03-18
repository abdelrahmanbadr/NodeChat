var db=require('../mysqlConnecion'); 
var tableName=" chat_users ";

var user={

getAllusers:function(currentUserid,callback) {
    return db.query("Select * from"+tableName+"where id !="+currentUserid,callback);
},
getuserById:function(id,callback) {
    return db.query("select * from"+tableName+"where id=?",[id],callback);
},
getUserByEmail(data,callback) {
    return db.query("Select * from"+tableName+" where email = '"+data.email+"'",callback);
},
adduser:function(data,callback) {
    return db.query("Insert into"+tableName+"set  ?",data,callback);
},
login:function(data,callback) {
    return db.query("Select * from"+tableName+"where email = '"+data.email+"'",callback);
},

 
};
 module.exports=user;