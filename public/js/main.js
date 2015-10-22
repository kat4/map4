var socket = io();
var prevTrainInfo = {};
//socket.emit('chat message in', input.value);

socket.on('update from server', function(update){
    console.log(update);
  });


socket.on('update train data', function(update){
      console.log(prevTrainInfo);
      var uniqueVehicleIds = [];
      var uniqueTrainObjects = [];
      var parsedData = JSON.parse(update);

      parsedData.forEach(function (obj) {
        if(uniqueVehicleIds.indexOf(obj.vehicleId) === -1){
          uniqueVehicleIds.push(obj.vehicleId);
          uniqueTrainObjects.push(obj);

        }
      });

      var trainInfo = uniqueTrainObjects.map(function (obj) {
        var newObj = {
          "vehicleId": obj.vehicleId,
          "timeToStation": obj.timeToStation,
          "destinationName": obj.destinationName,
          "lineId": obj.lineId
        };
        return newObj;
      });
      console.log('TrainInfo', trainInfo);

      var filteredTrainInfo = trainInfo.filter(function(element) {
        return !prevTrainInfo[element.vehicleId] || prevTrainInfo[element.vehicleId].timeToStation !== element.timeToStation ||
          !prevTrainInfo.hasOwnProperty(element.vehicleId);
      });

      //USE THIS TO GET THE DATA FOR THE ANIMATION. CHOO-CHOO!
      var changedTrains = filteredTrainInfo.reduce(function (prev, current) {
        prev[current.vehicleId] = current;
        return prev;
      }, {});


      prevTrainInfo = trainInfo.reduce(function(prev, current) {
        prev[current.vehicleId] = current;
        return prev;
      }, {});



  });
