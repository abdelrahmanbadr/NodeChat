var db=require('../mysqlConnecion'); 
var tableName="messages";
var message={

getChatMessages:function(userId1,userId2,callback){

return db.query("Select * from "+tableName + " where (senderId = "+userId1+
" AND receiverId = "+userId2+") or  (senderId = "+userId2+ " AND receiverId = "+userId1+")"

,callback);
 
},

 addMessage:function(data,callback){

 return db.query("Insert into "+tableName+" set  ?",data,callback);
 },

 
};
 module.exports=message;