var socket = io();

//socket.emit('chat message in', input.value);

socket.on('update from server', function(update){
    console.log(update);
  });


socket.on('update train data', function(update){
    JSON.parse(update).forEach(function(train){
      console.log(train.vehicleId);
      console.log(train.destinationName);
      console.log(train.timeToStation);
      console.log(train.currentLocation);
    });
  });
