var socket = io();

//socket.emit('chat message in', input.value);

socket.on('update from server', function(update){
    console.log(update);
  });
