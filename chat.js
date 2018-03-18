
module.exports = (io, http) => {

 
    var clients = [];
    // io.on('connection', function(socket){
    //   console.log('a user connected');
    // });
   
  
    io.on('connection', (socket) => {
      
  
      socket.on('add-message', (message,senderId,receiverId,userName) => {
        io.emit('message', {  text: message,senderId: senderId, receiverId: receiverId, userName: userName, created_at: new Date() });
      });
      // socket.on('add-unseenMessage', (senderId,receiverId,number) => {
      //   io.emit('unseenMessage', {  text: message,senderId: senderId, receiverId: receiverId, userName: userName, created_at: new Date() });
      // });
  
      socket.on('saveUserData', (userName,userId,avatar) => {
        
        // io.emit('saveUserData', { userName: userName ,userId: userId});
        let flag = false;
        clients.forEach(element => {
          if(element.userId == userId)
            flag = true;
        });

        if (!flag) clients.push({ userName: userName ,userId: userId,avatar:avatar});
        io.emit('users', {  users: clients });
      });
  
      socket.on('users', () => {
        console.log('user connected');
        io.emit('users', {  users: clients });
      });
  
      socket.on('exitSession', (userId) => {
        console.log("exitSession");

        clients.forEach((element,index) => {
          if(element.userId == userId)
            clients.splice(index, 1);
        });
        io.emit('users', {  users: clients });
        // const index = clients.indexOf(userName);
        // clients.splice(index, 1);
      });
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
  
    });
  
    return io;
  }