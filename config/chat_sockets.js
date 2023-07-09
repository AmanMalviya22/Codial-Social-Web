
module.exports.chatSockets = function(socketServer){
  // let io = require('socket.io')(socketServer);

  let io = require('socket.io')(socketServer, {cors: {
    origin: "*", 
    methods: ["GET", "POST"]}});

  io.sockets.on('connection', function(socket){
      console.log('new connection received', socket.id);

      socket.on('disconnect', function(){
          console.log('socket disconnected!');
      });

  });

}