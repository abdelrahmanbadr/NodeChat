var db=require('../mysqlConnecion'); 
var tableName=" messages ";
var message={

getChatMessages:function(userId1,userId2,callback){

return db.query("Select * from"+tableName + "where (senderId = "+userId1+
" AND receiverId = "+userId2+") or  (senderId = "+userId2+ " AND receiverId = "+userId1+")"

,callback);
 
},

 getLastMessages:function(receiverId,callback){
 return db.query("SELECT text,senderId,created_at from messages where id in (SELECT MAX(id) FROM"+tableName+"WHERE `receiverId` = "
 + receiverId +" GROUP by (senderId))",callback);
 },
 getLastMessage:function(receiverId,senderId,callback){
 return db.query("SELECT MAX(id),text,senderId,created_at FROM"+tableName+"WHERE `receiverId` = "+ receiverId 
 +" AND senderId = "+senderId
 +" GROUP by (senderId)",callback);
 },
 addMessage:function(data,callback){
 return db.query("Insert into"+tableName+"set  ?",data,callback);
 },

 
};
 module.exports=message;