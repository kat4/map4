var socket = io();

//socket.emit('chat message in', input.value);

socket.on('update from server', function(update){
    console.log(update);
  });


socket.on('update train data', function(update){
      var uniqueVehicleIds = [];
      var uniqueTrainObjects = [];
      var parsedData = JSON.parse(update);

      parsedData.forEach(function (obj) {
        if(uniqueVehicleIds.indexOf(obj.vehicleId) === -1){
          uniqueVehicleIds.push(obj.vehicleId);
          uniqueTrainObjects.push(obj);

        }
      });
      var animatedTrainInfo = uniqueTrainObjects.map(function (obj) {
        var newObj = {
          "vehicleId": obj.vehicleId,
          "timeToStation": obj.timeToStation,
          "destinationName": obj.destinationName,
          "lineId": obj.lineId
        };
        return newObj;
      });
      console.log('TrainInfo', animatedTrainInfo);
      // console.log('uniquetrain', uniqueTrainObjects);
      // console.log('uniqueID', uniqueVehicleIds);
      // var train1 = uniqueTrainObjects[0];
      // var train2 = uniqueTrainObjects[1];

      //console.log(train.vehicleId);
      //console.log(train.destinationName);

      // console.log('train1: ' + train1.timeToStation + ' to: ' + train1.destinationName + ' id: ' + train1.vehicleId);
      // console.log('train2: ' + train2.timeToStation + ' to: ' + train2.destinationName + ' id: ' + train2.vehicleId);
      //console.log(train.currentLocation);


  });
