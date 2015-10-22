var socket = io();

//socket.emit('chat message in', input.value);

socket.on('update from server', function(update){
    console.log(update);
  });


socket.on('update train data', function(update){
      var train1 = update[0];
      var train2 = update[1];

      //console.log(train.vehicleId);
      //console.log(train.destinationName);
      console.log('train1: ' + train1.timeToStation + ' to: ' + train1.destinationName + ' id: ' + train1.vehicleId);
      console.log('train2: ' + train2.timeToStation + ' to: ' + train2.destinationName + ' id: ' + train2.vehicleId);
      //console.log(train.currentLocation);


  });
