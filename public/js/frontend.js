var map = L.map('map').setView([51.504269, -0.113356], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'swashbuckler.cify6jkdd02dttcm0s1bknyqr',
  accessToken: 'pk.eyJ1Ijoic3dhc2hidWNrbGVyIiwiYSI6ImNpZnk2amtsYjAyYTh0NG03ZnAyaDFuaTIifQ.zL7e_N3nod_-P_D9skbAMg'
}).addTo(map);


L.geoJson(coordinates.waterlooAndCityLine).addTo(map);

function reverseArray(array){
  var modifiedArray = [];
  array.forEach(function(elem){
    modifiedArray.unshift(elem);
  });
  return modifiedArray;
}



function getCoords(time, routeCoords) {
  var routeLen = [];
  console.log(routeCoords);
  var pointsArray = routeCoords;


  pointsArray.reduce(function(prev, curr, index) {
    if (index === 0) {} else {
      routeLen.push(
        pythag(curr[0] - prev[0], curr[1] - prev[1])
      );
    }
    return curr;
  });

  function pythag(a, b) {
    return eightdp(Math.sqrt(eightdp(a * a + b * b)));
  }

  function eightdp(num) {
    return Math.round(num * 100000000) / 100000000;
  }

  var routeLenSum = routeLen.reduce(function(prev, curr, index) {
    return prev + curr;
  }, 0);

  var timeSteps = 240;
  var timeStepsArr = routeLen.map(function(elem) {
    return elem / routeLenSum * timeSteps;
  });

  var timeStepsCum = timeStepsArr.reduce(function(prev, curr, index) {
    if (index === 0) {

    } else {
      prev.push(eightdp(curr + prev[index - 1]));
    }
    return prev;
  }, [timeStepsArr[0]]);

  console.log("blablalallalalalal", time);
  time = 239 - time;
  if(time === 239) {
    time = 238;
  } else if (time === 0 || time === 1){
    time = 2;
  }

  var bounds = [];
  var points = [];
  console.log(timeStepsCum);
  timeStepsCum.reduce(function(prev, curr, index) {

    if (time > prev && time < curr) {

      bounds.push(prev);
      bounds.push(curr);
      points.push(pointsArray[index]);
      points.push(pointsArray[index + 1]);
    }

    return prev;

  }, 0);

  console.log("points", points);
  console.log("bounds", bounds);
  console.log("time", time);

  var percentageTravelled = interpolate(bounds[0], bounds[1], time);
  return coordsBetweenTwoPoints(points[0], points[1], percentageTravelled);

}

function interpolate(a, b, t) {
  return (t - a) / (b - a);
}

function coordsBetweenTwoPoints(coordA, coordB, fraction) {
  return [coordA[0] + (coordB[0] - coordA[0]) * fraction,
    coordA[1] + (coordB[1] - coordA[1]) * fraction
  ];
}

function switchCoords(coordsArray) {
  return [coordsArray[1], coordsArray[0]];
}

var changedTrains = {};
var trainMarkers = {

};

function updateTrains() {
  Object.keys(changedTrains).filter(function(elem){
  if(trainMarkers[elem]){// train exists, update time
    trainMarkers[elem].timeToStation = changedTrains[elem].timeToStation;
  }
    else{//add the train
      trainMarkers[elem] = changedTrains[elem];
      var dest = trainMarkers[elem].destinationName.substring(0, 4);
      console.log(dest, coordinates[dest]);
      trainMarkers[elem].marker = L.marker(switchCoords(getCoords(trainMarkers[elem].timeToStation, coordinates[dest]))).addTo(map);
    }
});
}

function refreshMarkers(){
  console.log(trainMarkers);
  Object.keys(trainMarkers).forEach(function(elem){
  var dest = trainMarkers[elem].destinationName.substring(0, 4);
  trainMarkers[elem].marker.setLatLng(switchCoords(getCoords(trainMarkers[elem].timeToStation, coordinates[dest]))).update();

  if(trainMarkers[elem].timeToStation > 1) {
  trainMarkers[elem].timeToStation = trainMarkers[elem].timeToStation - 1;
} else if(timeToStation === 0) {
    timeToStation = 1;
}

  });

}

window.setInterval(function() {
  refreshMarkers();
}, 1000);



// myInterval = 0;
// window.setInterval(function() {
//      hitSequence.setLatLng(L.latLng(
//      geojson.coordinates[t][0],
//      geojson.coordinates[t][1]));
//      myInterval = geojson.coordinates[t][2];
//   t += 1;
// }, myInterval);
// }
//train.setLatLng(newCoords);

//var marker = L.marker([51.504269, -0.113356], {'color': 'red'}).addTo(map);
//var newmarker = L.marker([51.513404, -0.088766]).addTo(map);
// icon: L.mapbox.marker.icon({
//   'marker-color': 'red'
//   'size':
